import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdService } from "src/app/ad/services/ad.service";
import { AdInterface } from "src/app/shared/types/ad.interface";
@Component({
    selector: 'egate-homepage',
    templateUrl: './homepage.component.html',
   
})

export class HomepageComponent implements OnInit {
    searchTag: string;
    lessonType: string;
    
    ads: AdInterface[];
    nearbyUsers: AdInterface[]
    latitude: number;
    longitude: number;
    position: string;
    constructor(private adService: AdService, private router: Router, private http: HttpClient) {}
    async ngOnInit() {
      
      }
     
      searchAds() {
        if (this.searchTag && this.lessonType) {
            if (this.lessonType === 'near-me') {
                this.getCoordinates();
            } else {
                const queryParams = { type: this.lessonType, tags: this.searchTag };
                this.router.navigate(['/ads'], { queryParams });
            }
        }
    }
    getCoordinates(): void {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                
                   
                   
                (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.fetchNearbyUsers(this.latitude, this.longitude);
                },
                (error) => {
                    console.error('Error getting user coordinates:', error);
                    
                },
                
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
           
        }
    }
    fetchNearbyUsers(latitude: number, longitude: number) {
        try {
            const queryParams = { latitude, longitude, tags: this.searchTag };
            this.router.navigate(['/ads'], { queryParams });
        } catch (error) {
            console.error('Error navigating to nearby ads:', error);
           
        }
    }
     
}