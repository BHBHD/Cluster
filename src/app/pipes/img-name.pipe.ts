import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgName'
})
export class ImgNamePipe implements PipeTransform {

  transform(url: string) {
    return url.split('?img=')[1];
  }

}
