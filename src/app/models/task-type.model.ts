// Only used on client side, as the types will not change
enum Type {
  Priority,   //0
  Recurrent,  //1
  FreeTime    //2
}

enum Color {
  Red = "red",
  Blue = "blue",
  Black = "black"
}

const ColorDictionary: Dictionary<Type, Color> = {
  [Type.Priority]: Color.Red,
  [Type.Recurrent]: Color.Blue,
  [Type.FreeTime]: Color.Black
}

module.exports = ColorDictionary;
