export class FilterService<T> {
  filter(items: T[], predicate: (item: T) => boolean): T[] {
    return items.filter(predicate);
  }
}
