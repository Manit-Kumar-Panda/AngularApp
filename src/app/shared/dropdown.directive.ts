import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from "@angular/core";

@Directive({ selector: "[appDropdown]" })
export class DropDownDirective implements OnInit {

    @HostBinding('class.open') isOpen: boolean;
    
    @HostListener('document:click' , ['$event']) clicked(eventData: Event) {
        // console.log("EventData printin:" ,eventData.target);
        // console.log("ElementRef printin:", (this.eleRef.nativeElement));
        // console.log("isPresent", this.eleRef.nativeElement.contains(eventData.target));
        // this.isOpen = !this.isOpen;
        this.isOpen = this.eleRef.nativeElement.contains(eventData.target) ? !this.isOpen : false;
    }

    ngOnInit() {
        this.isOpen = false; 
    }

    constructor( private eleRef: ElementRef) {
        
    }

   


}