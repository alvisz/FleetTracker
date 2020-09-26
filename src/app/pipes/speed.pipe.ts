import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(value: number): string {
    let speed = value;
    if (speed === null) speed = 0;
    return (speed + ' Km/h');
  }

}
