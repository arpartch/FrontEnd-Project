const example = "example@gmial.com"
if (/@gm(ia|a|i)l.com$/.test(example)) {
  alert("Maybe you meant @gmail.com?")
}