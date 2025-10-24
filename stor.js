
// fetch GIF
export async function gif(query){
    const apiKey = "u2GbphOxbKnrUzfqxH0hiXlU794nXoGG";

          try {
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${encodeURIComponent(query)}`,
          { mode: "cors" }
        );
        const data = await res.json();

        const gifUrl = data.data.images.original.url;

      } catch (err) {

      }

}