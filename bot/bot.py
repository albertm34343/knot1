import asyncio
import os

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    InlineQuery,
    InlineQueryResultArticle,
    InputTextMessageContent,
    Message,
)
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
WEB_APP_URL = "https://24pair.ru/"

dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message) -> None:
    username = message.from_user.username

    if not username:
        await message.answer(
            "Сначала создайте username в настройках Telegram."
        )
        return

    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Да",
                    web_app={"url": WEB_APP_URL},
                )
            ]
        ]
    )

    await message.answer(
        "Хотите ли вы присоединиться к сервису knot?",
        reply_markup=keyboard,
    )


@dp.inline_query()
async def inline_query(inline_query: InlineQuery) -> None:
    result = InlineQueryResultArticle(
        id="knot",
        title="Knot",
        input_message_content=InputTextMessageContent(
            message_text="Открыть Knot"
        ),
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="Открыть Knot",
                        web_app={"url": WEB_APP_URL},
                    )
                ]
            ]
        ),
    )

    await inline_query.answer([result], cache_time=0)


async def main() -> None:
    bot = Bot(token=TOKEN)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())