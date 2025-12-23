import axios from "axios";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    const user = await axios.post(process.env.NEXTAUTH_URL + "/register", {
      email,
      password,
      name,
    });
    return new Response(JSON.stringify(user.data), { status: 201 });
  } catch (error) {
    return error instanceof Error;
  }
}
