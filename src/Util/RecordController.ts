class RecordController {
  add(list: any, item: any) {
    let newList = [...list];
    newList.unshift(item);
    return newList;
  }
  update(list: any, item: any) {
    let newList = [...list];
    let record = newList.findIndex((each) => each?.id === item?.id);
    newList[record] = item;
    return newList;
  }
  delete(list: any, item: any) {
    let newList = [...list];
    let record = newList.findIndex((each) => each?.id === item?.id);
    newList.splice(record, 1);
    return newList;
  }
}
export default new RecordController();
