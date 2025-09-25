import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})
export class TruncateWordsPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    let words = value;
    return words.length > limit ? words.substring(0, limit) + '...' : value;
  }
}