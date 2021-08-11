import { Component, OnInit } from '@angular/core';
import { BGdata } from '../BG.model';
import {FormControl,FormGroup,NgModel, FormBuilder} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import {CdkDragDrop, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.css']
})


export class BGComponent implements OnInit {
  selectedBG!: string;
  selectedBot!: number;
  subdata!: string;
  gotdata : boolean = false;
  donorSet : boolean = false;
  dur  = 5;
  color !: string; 
  pos !: number;
  Bottles = [''];
  BGI : BGdata[] =[];
  BGIcpy : BGdata[] =[];
  bucketarr : BGdata[] =[];
  isautofilled! : boolean;
  constructor(
    private _snackBar: MatSnackBar,private fb: FormBuilder,
  ) { }


  BBForm = this.fb.group({
    0: [''],
    1: [''],
    2: [''],
    3: [''],
    4: [''],
    5: [''],
    6: [''],
    7: [''],
    });

  ngOnInit(): void {


//BGI = Blood Group Info
this.BGI = [
{BGname:"A+",BGitem:30,isDonor:false},{BGname:"B+",BGitem:30,isDonor:false},
{BGname:"A-",BGitem:30,isDonor:false},{BGname:"B-",BGitem:30,isDonor:false},
{BGname:"AB+",BGitem:30,isDonor:false},{BGname:"AB-",BGitem:30,isDonor:false},
{BGname:"O+",BGitem:30,isDonor:false},{BGname:"O-",BGitem:30,isDonor:false}

];


this.Bottles = ['1','2','3','4','5','6','7','8','9','10'];




}

gotData(){

if(this.BBForm.value[7]!=0)
console.log(this.BGI);


{
  this.gotdata = true;
}

}

BBdata()
{
      
    this.gotData();
   
    
    for (let i = 0; i < this.BGI.length; i++) {
      
      this.BGI[i].BGitem = this.BBForm.value[i];
    }
   
        
    
}

openSnackBar() {
  this._snackBar.open('Added Successfully', 'Close', {
    duration: 1000
  });
}


BGMatcher(){

  console.log(this.selectedBG);
  if(this.donorSet){
    this.resetDonor();
  }
  
  
  if(this.selectedBG=="A+")
  {    //  A+,A-,O+,O-
      for (let index = 0; index < this.BGI.length; index++) {

        if((this.BGI[index].BGitem>=this.selectedBot) &&
         (this.BGI[index].BGname=="A+"|| this.BGI[index].BGname=="A-"||
         this.BGI[index].BGname=="O+"||this.BGI[index].BGname=="O-")){
              this.BGI[index].isDonor=true;
              this.donorSet=true;
        }
      }  
  }


  if(this.selectedBG=="A-")
  {    //A-,O-
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGitem>=this.selectedBot) &&
         (this.BGI[index].BGname=="A-"|| this.BGI[index].BGname=="O-")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }


  if(this.selectedBG=="B+")
  {    //A-,O-
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGitem>=this.selectedBot) &&
         (this.BGI[index].BGname=="B+"|| this.BGI[index].BGname=="B-"||
         this.BGI[index].BGname=="O+"||this.BGI[index].BGname=="O-")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }

  if(this.selectedBG=="B-")
  {    //A-,O-
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGitem>=this.selectedBot) &&
         (this.BGI[index].BGname=="B-"|| this.BGI[index].BGname=="O-"
        )){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }

  if(this.selectedBG=="AB+")
  {    
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGitem>=this.selectedBot)){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }


  if(this.selectedBG=="AB-")
  {    
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGitem>=this.selectedBot) &&
         (this.BGI[index].BGname=="AB-"|| this.BGI[index].BGname=="B-"||
         this.BGI[index].BGname=="O-"||this.BGI[index].BGname=="A-")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }

  if(this.selectedBG=="O+")
  {    
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGitem>=this.selectedBot) &&
         (this.BGI[index].BGname=="O-"||this.BGI[index].BGname=="O+")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }

  if(this.selectedBG=="O-")
  {    
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGitem>=this.selectedBot) && (this.BGI[index].BGname=="O-")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }

}



drop(event: CdkDragDrop<any>) {



  if(this.bucketarr.length>0){
    return;
  }
  
  // console.log(event.previousContainer.data[6].isDonor);
  if(event.previousContainer.data[event.previousIndex].isDonor){

  
  if (event.previousContainer === event.container) {
    moveItemInArray(this.BGI, event.previousIndex, event.currentIndex);
  } else {
           this.pos = event.previousIndex;

    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
                      
                    
  }
  
  this.bucketarr[0].BGitem=this.bucketarr[0].BGitem - this.selectedBot;
var arr : BGdata = {'BGname' : this.bucketarr[0].BGname ,'BGitem' :this.bucketarr[0].BGitem ,'isDonor' : true };
 console.log(this.pos);
 this.BGI.splice(this.pos,0,arr);
 
 this.bucketarr[0].BGitem = this.selectedBot;

  // for (let index = 0; index < this.BGI.length; index++) {
  //   if(this.BGI[index].BGname==this.bucketarr[0].BGname){
  //         this.BGI[index].BGitem = this.BGI[index].BGitem - this.selectedBot;
  //         this.BGI[this.pos].BGitem = this.BGI[this.pos].BGitem - this.selectedBot;   
  //        console.log("selected BG" + this.BGI[index].BGname);
         
  //   }
    
  // }
  
}

}

BBautodata(){
this.isautofilled=true;
  this.gotdata=true;
}
resetDonor(){
  this.bucketarr=[];
 
  for (let index = 0; index < this.BGI.length; index++) {
    //this.BGI[index].BGitem = this.BBForm.value[index];
    this.BGI[index].isDonor=false;
    
  }

}
reset()
{

  if(this.isautofilled){
  this.selectedBG = '';
  this.selectedBot = 0;
    this.resetDonor();
  }

  else{
  this.bucketarr=[];
  this.selectedBG = '';
  this.selectedBot = 0;

 
 
  for (let index = 0; index < this.BGI.length; index++) {
    this.BGI[index].BGitem = this.BBForm.value[index];
    this.BGI[index].isDonor=false;
    
  }
 }

}

}
