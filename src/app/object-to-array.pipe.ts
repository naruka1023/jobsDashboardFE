import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'rxjs/operators';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(value): any {
    if(value != null){
      let values = Object.values(value);
      return values;
    }
    return value;
  }
}
