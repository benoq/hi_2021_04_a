//drawing on-screen functions

export const drawHand = (predictionArray, canvas) => {
    if (predictionArray.length > 0) {
        predictionArray.forEach((prediction) => {
            const landmarks = prediction.landmarks;

            for (let i = 0; i < landmarks.length ; i++) {
                // Get x point
                const x = landmarks[i][0];
                // Get y point
                const y = landmarks[i][1];
                // Start drawing "htm canvas arc" = circle
                canvas.beginPath();
                canvas.arc(x,y,8,0,2*Math.PI);
                canvas.fillstyle = "indigo";
                canvas.fill();
            }
        });
    }
};