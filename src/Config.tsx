type Char = {
  [index: string]: boolean
}

class Config {
  static speed: number = 5
  static word_length: number = 2
  static vokale: Char = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true,
    ei: false,
    el: false,
    on: false,
    in: false
  }
  static umlaute: Char = {
    ä: true,
    ö: false,
    ü: false
  }
  static consonant: Char = {
    d: true,
    r: true,
    w: true,
    p: true,
    s: true,
    l: true,
    m: true,
    t: true,
    n: true,
    z: true,
    f: true,
    k: false,
    g: false,
    h: false,
    j: false
  }
}

export default Config