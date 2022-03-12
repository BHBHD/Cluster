export function toIterable(length: number) {
  const array = [];
  for (let i = 0; i < length; i++)
    array.push(i);
  return array;
}

export function camelToSentenceCase(words: string) {
  const regex = /([A-Z])(?=[a-z][A-Z])|([a-z])(?=[A-Z])/g;
  return words
      .replace(regex, '$& ')[0]
      .toUpperCase() +
    words
      .replace(regex, '$& ')
      .slice(1);
}

export function sentenceToCamelCase(words: string) {
  const capitalized = words
    .replace(/\s+(.)/g, (match, group) => group.toUpperCase());
  return capitalized[0].toLowerCase() + capitalized.slice(1);
}

export function kebabToCamelCase(words: string) {
  const arr = words.split('-');
  const capital = arr.map((item, index) =>
    index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item);

  const capitalized = capital.join('');
  return capitalized[0].toLowerCase() + capitalized.slice(1);
}


export function truncate(text: string, n: number = 200){
  return (text.length > n) ? text.substr(0, n-1) + '...' : text;
}

export function timeSince(date: string) {
  let now = new Date();
  let past = new Date(date);
  let seconds = Math.floor(now.getTime() - past.getTime()) / 1000;
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
