expression
  = ("$url"i / "$method"i / "$statusCode"i / "$request."i source / "$response."i source / "$message."i source / "$inputs."i name / "$outputs."i name / "$steps."i name / "$workflows."i name / "$sourceDescriptions."i name / "$components."i name / "$components.parameters."i parameter_name)

source
  = (header_reference / query_reference / path_reference / body_reference)

name
  = (CHAR)*

parameter_name
  = name

header_reference
  = "header."i token

query_reference
  = "query."i name

path_reference
  = "path."i name

body_reference
  = "body"i ("#" json_pointer)?

CHAR
  = [\x01-\x7f]

token
  = tchar+

json_pointer
  = ("/" reference_token)*

tchar
  = "!"
  / "#"
  / "$"
  / "%"
  / "&"
  / "'"
  / "*"
  / "+"
  / "-"
  / "."
  / "^"
  / "_"
  / "`"
  / "|"
  / "~"
  / DIGIT
  / ALPHA

reference_token
  = (unescaped / escaped)*

DIGIT
  = [\x30-\x39]

ALPHA
  = [\x41-\x5a]
  / [\x61-\x7a]

unescaped
  = [\x00-\x2e]
  / [\x30-\x7d]
  / [\x7f-\ud7ff]
  / [\ue000-\uffff]
  / [\ud800-\udbff] [\udc00-\udfff]

escaped
  = "~" ("0" / "1")

