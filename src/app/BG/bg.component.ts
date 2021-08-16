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
filled: boolean = false;
  selectedBG!: string;
  selectedBot!: number;
  bottlesVar!: number;
  availableBot!: number;
  eventBG !: string;
sum : number = 0;
  qty:number = 0;
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
  this.bottlesVar = this.selectedBot ;


  console.log(this.selectedBG);
  if(this.donorSet){
    this.resetDonor();
  }
  
  
  if(this.selectedBG=="A+")
  {    //  A+,A-,O+,O-
      for (let index = 0; index < this.BGI.length; index++) {

        if((this.BGI[index].BGname=="A+"|| this.BGI[index].BGname=="A-"||
         this.BGI[index].BGname=="O+"||this.BGI[index].BGname=="O-")){
              this.BGI[index].isDonor=true;
              this.donorSet=true;
        }
      }  
  }


  if(this.selectedBG=="A-")
  {    
      for (let index = 0; index < this.BGI.length; index++) {
        if((this.BGI[index].BGname=="A-"|| this.BGI[index].BGname=="O-")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }


  if(this.selectedBG=="B+")
  {   
      for (let index = 0; index < this.BGI.length; index++) {
        if(
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
        if(
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
        // if((this.BGI[index].BGitem>=this.selectedBot))
        {
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }


  if(this.selectedBG=="AB-")
  {    
      for (let index = 0; index < this.BGI.length; index++) {
        if(
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
        if(
         (this.BGI[index].BGname=="O-"||this.BGI[index].BGname=="O+")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }

  if(this.selectedBG=="O-")
  {    
      for (let index = 0; index < this.BGI.length; index++) {
        if( (this.BGI[index].BGname=="O-")){
            this.BGI[index].isDonor=true;
            this.donorSet=true;
        }
      }  
  }

}



drop(event: CdkDragDrop<any>) {



if(this.filled){
  return;
}

// if(this.sum>=this.selectedBot){
//   console.log("sum:"+ this.sum);
  
  
//   return;
// }
  


  // if(this.bucketarr.length>0){
  //   return;
  // }
  
  // console.log(event.previousContainer.data[6].isDonor);
  if(event.previousContainer.data[event.previousIndex].isDonor){

  
  if (event.previousContainer === event.container) {
    moveItemInArray(this.BGI, event.previousIndex, event.currentIndex);
  } else {
           
           this.pos = event.previousIndex;
           this.availableBot = event.previousContainer.data[event.previousIndex].BGitem;
           this.eventBG =  event.previousContainer.data[event.previousIndex].BGname;

    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
                                          
  }
  

 
  
  if(this.availableBot<=this.bottlesVar){
  this.bottlesVar = this.bottlesVar - this.availableBot ;
  // this.bucketarr[this.qty].BGitem=this.bucketarr[this.qty].BGitem - this.availableBot;



  var arr : BGdata = {'BGname' : this.eventBG ,'BGitem' :0 ,'isDonor' : false };
  this.BGI.splice(this.pos,0,arr);

  for (let index = 0; index < this.bucketarr.length; index++) {
    if(this.bucketarr[index].BGname == this.eventBG)
    {
      this.bucketarr[index].BGitem=this.availableBot;
    //  this.filled = true;
    }   
  // this.bucketarr[this.qty].BGitem = this.availableBot;
  // this.qty++;

  }
       }
 
 
 else if( this.availableBot>this.bottlesVar){
  // this.bucketarr[this.qty].BGitem=this.bucketarr[this.qty].BGitem - this.bottlesVar;
  var temp1 : number = 0;
  temp1 = this.availableBot;
  this.availableBot = this.availableBot - this.bottlesVar;
this.bottlesVar = this.bottlesVar - this.availableBot;

  var arr : BGdata = {'BGname' : this.eventBG ,'BGitem' :this.availableBot ,'isDonor' : true };
//  console.log(this.pos);
 this.BGI.splice(this.pos,0,arr);
 
 for (let index = 0; index < this.bucketarr.length; index++) {
                   if(this.bucketarr[index].BGname == this.eventBG)
                   {
                     this.bucketarr[index].BGitem=temp1 - this.availableBot;
                     this.filled = true;
                   }   
 }
  this.qty++;

}


  
for (let index = 0; index < this.bucketarr.length; index++) {
  this.sum = this.sum + this.bucketarr[index].BGitem;

}


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


  if(this.sum>this.selectedBot){
     this.bucketarr.pop();
  }

}

reset()
{ this.filled = false;
  this.sum = 0;

  if(this.isautofilled){
  this.selectedBG = '';
  this.selectedBot = 0;
  
  this.resetDonor();

    this.BGI = [
      {BGname:"A+",BGitem:30,isDonor:false},{BGname:"B+",BGitem:30,isDonor:false},
      {BGname:"A-",BGitem:30,isDonor:false},{BGname:"B-",BGitem:30,isDonor:false},
      {BGname:"AB+",BGitem:30,isDonor:false},{BGname:"AB-",BGitem:30,isDonor:false},
      {BGname:"O+",BGitem:30,isDonor:false},{BGname:"O-",BGitem:30,isDonor:false}
      
      ];
      
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
