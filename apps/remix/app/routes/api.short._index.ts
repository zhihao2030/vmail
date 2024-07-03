import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const longUrl = request.headers.get('Data')
    console.log(longUrl,888)
  let res = {
    code: 400,
    msg: 'try again later!'

  }
  try {
     res = await fetch('http://39.107.248.238/smq/common/short/shorten',{
      method:'POST',
      body:JSON.stringify({
        longUrl: longUrl
      }),
      headers: {
      'Content-Type': 'application/json'
      }
    })
  } catch {
    console.log('error')
  }
  return res;
};
