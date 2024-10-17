interface UserInput {
    email: string;
    password: string;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  function validateUserInput(input: UserInput): boolean {
    if (!emailRegex.test(input.email)) {
      throw new Error('Invalid email format');
    }
    return true;
  }
  
  const userInput: UserInput = { email: 'pravinchavan0656@gmail.com', password: 'pass123' };
  try {
    validateUserInput(userInput);
  } catch (error) {
    console.error(error.message);
  }
