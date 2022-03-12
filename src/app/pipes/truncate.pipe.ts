import { Pipe, PipeTransform } from '@angular/core';
import { truncate } from '../utils';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
  transform(words: string) {
    return truncate(words);
  }
}
