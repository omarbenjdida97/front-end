import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatSendService } from './services/chat.service';
import * as SendBird from 'sendbird';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { Subscription, filter } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { currentUserSelector } from '../auth/store/selectors';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-chat-send',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatSendComponent implements OnInit, AfterViewInit {
  sendbird: SendBird.SendBirdInstance;
  sb: any;

  channel: SendBird.GroupChannel;
  newMessage: string;
  currentUserID: string;
  targetUserID: string;
  currentUser: CurrentUserInterface;
  currentUserSubscription: Subscription;
  connected = false;
  modifiedChannelName: string;
  currentUserImage: string;
  member1: string;
  member2: string;
  talkerpic: SendBird.User;
  current: SendBird.User;
  @ViewChild('chatContainer') chatContainer: ElementRef;

  // String with the error (in case of any, when creating a group channel)
  startConversationResult: string;

  // List of this signed user's group channels
  conversations: Array<SendBird.GroupChannel> | null;

  // String with the error (in case of any, when trying to list our group channels)
  listConversationsResult: string | null;

  // Keep track of the selected group channel
  selectedChannel: SendBird.GroupChannel | null;

  // The list of messages obtained from the selected group channel
  messages: Array<
    SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage
  > | null;

  // Input text to send as a message to the group channel
  textMessage: any;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private chatService: ChatSendService,
  ) {
    this.sb = chatService.sb;

    this.sendbird = new SendBird({
      appId: 'F1F92F1E-978A-4746-9DCD-1FB1407E0F37',
    });
  }
  ngOnInit(): void {
    this.chatService.init();
    this.intializeListeners();
    this.registerEventHandlers();
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    setTimeout(() => {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    });
  }
  intializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.currentUserImage = currentUser.image;
        this.currentUserID = currentUser.username;
        console.log('currentUser', currentUser);
        console.log('userID', this.currentUserID);
        this.route.queryParams.subscribe((params) => {
          this.targetUserID = params['targetUserId'];
          console.log('authorId in here', this.targetUserID);
          this.connect();

          this.getMyConversations();
          this.startConversation();
        });
      });
  }

  connect() {
    this.chatService.connect(this.currentUserID, null)
      .then((user: any) => {
        this.registerEventHandlers();
        console.log('brakka', user.plainProfileUrl);
        this.current = user;
        this.connected = true;
      })
      .catch((error: any) => {
        console.error('Error connecting to SendBird:', error);
      });
  }
  registerEventHandlers() {
    this.chatService.registerEventHandlers('123', (data: { event: string; data: any }) => {
      console.log('New event: ' + data.event, data.data);
      if (data.event === 'onMessageReceived' && this.selectedChannel && this.selectedChannel.url === data.data.channel.url) {
        // Update the messages array with the new message
        this.messages.push(data.data.message);
      }
    });
  }
  startConversation() {
    let channelName = this.currentUserID + ' ' + this.targetUserID;
    let userIds = [this.currentUserID, this.targetUserID];
    this.chatService.createGroupChannel(channelName, userIds)
      .then((groupChannel: SendBird.GroupChannel) => {
        this.startConversationResult = 'Conversation created';
        this.getMyConversations();
      })
      .catch((error: SendBird.SendBirdError) => {
        this.startConversationResult = 'Error creating the conversation';
        console.error('Error creating the conversation:', error);
      });
  }
  getMyConversations() {
    this.chatService.getMyGroupChannels()
      .then((groupChannels: Array<SendBird.GroupChannel>) => {
        this.conversations = groupChannels;
      })
      .catch((error: SendBird.SendBirdError) => {
        this.listConversationsResult = 'Unable to get your conversations';
        console.error('Unable to get your conversations:', error);
      });
  }
  getMessages(channel: SendBird.GroupChannel) {
    this.selectedChannel = channel;
    this.chatService.getMessagesFromChannel(channel)
      .then((messages: Array<SendBird.UserMessage | SendBird.FileMessage | SendBird.AdminMessage>) => {
        this.messages = messages;
        console.log('messages', this.messages);
        console.log('talkerpic', this.talkerpic);
        this.member1 = this.selectedChannel.members[0].nickname;
        this.currentUserImage = this.selectedChannel.members[1].plainProfileUrl;
        console.log('imagelo', this.currentUserImage);
        this.member2 = this.selectedChannel.members[1].nickname;
        console.log('member1', this.member1);
        console.log('member2', this.member2);
        this.modifiedChannelName = this.removeCurrentUser(this.selectedChannel.name);
        this.chatService.registerEventHandlers('123', (data: { event: string; data: any }) => {
          if (data.event === 'onMessageReceived' && this.selectedChannel && this.selectedChannel.url === data.data.channel.url) {
            // Add the new message to the messages array
            this.messages.push(data.data.message);
          }
        });
      })
      .catch((error: SendBird.SendBirdError) => {
        console.error('Error getting messages from channel:', error);
      });
  }
  async sendMessage() {
    if (!this.textMessage || !this.selectedChannel) {
      return;
    }
  
    try {
      const userMessage = await this.chatService.sendMessage(this.selectedChannel, this.textMessage);
      // Add the new message to the messages array
      this.messages.push(userMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    // Clear the input field after sending the message
    this.textMessage = '';
  }

  sendNotification(channel: SendBird.GroupChannel, message: string) {
    // Set up the notification payload
    const payload = {
      user_ids: [this.targetUserID], // Replace with the receiver's user ID
      target_url: 'https://example.com', // The URL to redirect the receiver when they click on the notification
      payload: {
        title: 'New Message',
        message: 'You have received a new message',
        channel_url: channel.url,
        message_content: message, // Pass the channel URL to the notification payload
        // Pass the message content to the notification payload
      },
    };
  
    // Make the POST request to send the notification
    axios.post('https://api-F1F92F1E-978A-4746-9DCD-1FB1407E0F37.notifications.sendbird.com', payload, {
      headers: {
        'Api-Token': '9317c8f728016de1b48da9cb36563796ba89b6fb', // Replace with your SendBird Notifications API token
      },
    })
      .then(response => {
        console.log('Notification sent successfully');
      })
      .catch(error => {
        console.error('Failed to send notification:', error);
      });
  }

  updateTextMessage(event: any) {
    const value = event.target.value;
    if (!value || !this.selectedChannel) {
      return;
    }
    this.textMessage = value;
  }
  removeCurrentUser(name: string): string {
    return name.replace(this.currentUserID, '');
  }
}
