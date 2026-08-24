import asyncio
import os

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message) -> None:
    username = message.from_user.username

    if not username:
        await message.answer(
            "Сначала создайте username в настройках Telegram."
        )
        return

    await message.answer(
        f"Привет, @{username}! Добро пожаловать в Knot."
    )


async def main() -> None:
    bot = Bot(token=TOKEN)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())