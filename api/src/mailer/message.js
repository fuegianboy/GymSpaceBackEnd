
module.exports = (firstName, lastName, html, link) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #414141;
        color: #333;
        margin: 0;
        padding: 0;
        text-align: center;
      }
      
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #000000;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
  
      h1 {
        color: #ff9721;
      }
      
      h3 {
        color: #ff9721;
      }
  
      p {
        margin: 20px 0;
        color: #ff9721;
      }
  
      a {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        color: #ff9721;
        text-decoration: none;
        background-color: #414141;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }
      
      a:hover {
        background-color: #b96c29;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>GymSPACE</h1>
      <h3>${firstName} ${lastName}</h3>
      <p>${html}</p>
      <a href=${link}>Link</a>
    </div>
  </body>
  </html>
`;
