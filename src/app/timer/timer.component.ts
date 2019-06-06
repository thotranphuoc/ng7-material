import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  COUNT: number = 0;
  HH: string = '00';
  MM: string = '00';
  SS: string = '00';
  isTimeUp: boolean = false;
  @Input('DURATION') timer: number;
  @Output('onTimeUp') isTimeUpEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    console.log(this.timer);

    let myInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        let _HH = Math.floor(this.timer / 60 / 60)
        this.HH = this.twoDegit(_HH);
        let _MM = Math.floor(this.timer / 60) % 60;
        this.MM = this.twoDegit(_MM);
        let _SS = Math.floor(this.timer - _MM * 60);
        this.SS = this.twoDegit(_SS);
      } else {
        this.isTimeUp = true;
        this.isTimeUpEvent.emit(true);
        clearInterval(myInterval);
      }
    }, 1000)
  }

  twoDegit(NUM: number) {
    let _NUM = NUM.toString();
    return _NUM.length < 2 ? '0' + _NUM : _NUM;
  }

}
