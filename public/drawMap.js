const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const globeImage = new Image();
globeImage.src = "/styles/globe.jpg"; // Served from public/styles

globeImage.onload = () => {
  drawScene();
};

// Convert lat/lon to canvas X/Y
function lat_lon_to_X_Y(lat, lon) {
  // longitude ranges from -180 to 180
  const x = ((lon + 180) / 360) * canvasWidth;
  // latitude ranges from -90 to 90
  const y = ((90 - lat) / 180) * canvasHeight;
  return [x, y];
}

function drawScene() {
  // Draw background globe
  ctx.drawImage(globeImage, 0, 0, canvasWidth, canvasHeight);

  // Draw path using white circles
  if (issData?.path) {
    for (let i = 0; i < issData.path.length; i++) {
      // Each path point is an array [lat, lon] from server
      const [lat, lon] = issData.path[i];
      const [x, y] = lat_lon_to_X_Y(lat, lon);
      // CanvasRenderingContext2D beginPath() method starts a new, clean drawing path this prevents shapes from being unintentionally connected.
      ctx.beginPath(); 
      ctx.arc(x, y, 2, 0, Math.PI * 2); // radius 2 for small circles
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  // Draw current ISS location (red circle)
  if (issData?.currentLat && issData?.currentLon) {
    const [x, y] = lat_lon_to_X_Y(issData.currentLat, issData.currentLon);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2); // radius 5 for bigger circle
    ctx.fillStyle = "red";
    ctx.fill();
  }
}

