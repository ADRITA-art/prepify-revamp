import dotenv from "dotenv";
import OpenAI from "openai";
import Article from "../models/articleModel.mjs";

dotenv.config();

const openai = new OpenAI();

export const createArticle = async (req, res) => {
  try {
    const { topic } = req.body;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: "OpenAI API key is missing." });
    }

    openai.apiKey = OPENAI_API_KEY;

    // Generate article content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
messages: [
  { role: "system", content: "You are a helpful assistant specializing in creating articles on technical and study-related topics for college students. You strictly avoid non-academic or unrelated subjects." },
  {
    role: "user",
    content: `Write an article on the topic: ${topic}. Ensure the article is concise, limited to 200 words, and includes relatable examples to help college students understand the concept effectively. If the topic is not technical or study-related, respond with: 'I'm here to assist with technical or academic topics. Please provide a relevant topic for an article.'`
  },
]

    });


    const articleContent = completion.choices[0].message.content;

    // Save the generated article to the database
    const newArticle = new Article({
      topic,
      content: articleContent,
      userId: req.user.id, // Assuming `req.user.id` is set by the auth middleware
    });
    await newArticle.save();

    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const userId = req.user.id;

    const articles = await Article.find({ userId });
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
