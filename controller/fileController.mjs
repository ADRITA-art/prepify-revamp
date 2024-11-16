// import pdfParse from 'pdf-parse';

// export const convertPDFToText = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   try {
//     // Pass the buffer directly to pdf-parse
//     const data = await pdfParse(req.file.buffer);
//     res.json({ text: data.text });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error processing PDF file" });
//   }
// };
