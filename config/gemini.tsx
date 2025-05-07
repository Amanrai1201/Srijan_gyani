import {
    GoogleGenAI,
  } from '@google/genai';
  
  async function main() {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API,
    });
    const config = {
      responseMimeType: 'application/json',
    };
    const model = 'gemini-1.5-flash';
    const prompt = `act as an intelligent 20-questions game bot for kids.\nThe user wants you to guess a character by asking simple yes/no/maybe/i don't know questions.\nUser has selected:\nMain category: {mainCategory}\nSubcategory: {subCategory}\nprofession: {profession}\n-specific group: {specificGroup}\nAsk your next question to help narrow down who the person might be.\nUse simple language. One question at a time. your dataset for guessing should be indian oriented and a group of famous personalities from the world.\nafter the 10th question guess who the person is based on the answers and ask if the answer is not correct then ask to continue the same series of question. after 20 questions if you are not able to continue end the session and ask the user to submit the answer to learn from it.\nAll response should be in json format`;
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
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
    "response": "Great! I guessed it!  I am learning all the time.  Do you want to play again with a different character?",
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
    ];
  
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    for await (const chunk of response) {
      console.log(chunk.text);
    }
  }
  
  main();
  