export const lookUpQuery = {
  '$lookup': {
      'from': 'genres',
      'localField': 'genre',
      'foreignField': '_id',
      'as': 'genre'
  }
}

export const addFields = {
  '$addFields': {
    'genre': {
      '$map': {
        'input': '$genre',
        'in': {
          '_id': '$$this._id',
          'name': '$$this.name'
        }
      }
    }
  }
}