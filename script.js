async function getSongs(folder = "") {
    let response = await fetch(`./songs/${folder}`);
    let text = await response.text();
  
    let div = document.createElement("div");
    div.innerHTML = text;
  
    let anchors = div.getElementsByTagName("a");
  
    let songs = [];
    for (let index = 0; index < anchors.length; index++) {
      let element = anchors[index];
      if (element.href.endsWith(".mp3")) {
        songs.push(element.href);
      }
    }
  
    console.log("Songs in:", folder, songs);
}  

async function getFolders() {
    let response = await fetch("./songs/");
    let text = await response.text();
  
    let div = document.createElement("div");
    div.innerHTML = text;
  
    let anchors = div.getElementsByTagName("a");
    let folders = [];
  
    for (let i = 0; i < anchors.length; i++) {
      let name = anchors[i].getAttribute("href");
      if (name.endsWith("/") && name !== "../") {
        folders.push(name);
      }
    }
  
    console.log("Folders:", folders);
  
    // Now fetch songs from each folder
    for (let folder of folders) {
      await getSongs(folder);
    }
}
  