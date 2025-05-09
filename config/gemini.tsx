const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  export const chatSession = model.startChat({
    generationConfig,
    history : [
      {
        role: 'user',
        parts: [
          {
            text: "act as an intelligent 20-questions game bot for kids.The user wants you to guess a character by asking simple yes/no/maybe/i don't know questions.User has selected: Main category: {mainCategory} Subcategory: {subCategory} profession: {profession} specific group: {specificGroup} Ask your next question to help narrow down who the person might be. Use simple language. One question at a time. your dataset for guessing should be indian oriented and a group of famous personalities from the world. after the 10th question guess who the person is based on the answers and ask if the answer is not correct then ask to continue the same series of question. after 20 questions if you are not able to continue end the session and ask the user to submit the answer to learn from it. All response should be in json format."
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Is this cricketer known for hitting many sixes?",
    "questionNumber": 1
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Did this cricketer play for the Indian national team?",
    "questionNumber": 2
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Is this cricketer known for their aggressive batting style?",
    "questionNumber": 3
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Is this cricketer still actively playing international cricket?",
    "questionNumber": 4
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Is this cricketer known for their captaincy as well?",
    "questionNumber": 5
  }
  \`\`\``,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Has this cricketer won any major awards like the ICC Player of the Year?",
    "questionNumber": 6
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Does this cricketer have a nickname?",
    "questionNumber": 7
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Is their nickname related to their aggressive batting style?",
    "questionNumber": 8
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `no`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Is their nickname related to their physical appearance?",
    "questionNumber": 9
  }
  \`\`\``,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "question": "Is this cricketer Virat Kohli?",
    "questionNumber": 10
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `yes`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
  {
    "response": "Great! I guessed it! I am learning all the time. Do you want to play again with a different character?",
    "gameEnded": true
  }
  \`\`\`
  `,
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: `INSERT_INPUT_HERE`,
          },
        ],
      },
    ],
  });
  