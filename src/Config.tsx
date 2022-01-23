type Char = {
  [index: string]: boolean
}

class Config {
  static word_length: number = 2
  static vokale: Char = {
    a: true,
    e: true,
    i: true,
    o: true,
    u: true,
    ei: false,
    el: false,
    eu: false,
    on: false,
    in: false
  }
  static umlaute: Char = {
    ä: false,
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
    b: false,
    k: false,
    g: false,
    h: false,
    j: false
  }
}

export default Config