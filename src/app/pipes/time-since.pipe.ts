import {Pipe, PipeTransform} from '@angular/core';
import {timeSince} from "../utils";

@Pipe({name: 'timeSince'})
export class TimeSincePipe implements PipeTransform {

  transform(date: string) {
    return timeSince(date);
  }

}
