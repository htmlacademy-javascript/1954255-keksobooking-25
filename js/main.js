const randomizer = (min ,max, numsAfterDot) => {
  if (min < max) {
    const int = Math.floor(Math.random() * (max - min)) + min;
    if (numsAfterDot > 0) {
      let float = String(Math.random()).substr(1, numsAfterDot + 1);
      while (float.length < numsAfterDot) {
        float += '0';
      }
      return int + float;
    } else {
      return int;
    }
  } else {
    return 'incorrect data';
  }
};

randomizer(12, 32, 5);
