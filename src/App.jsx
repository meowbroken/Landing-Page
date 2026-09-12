import { useEffect, useMemo, useState } from 'react'

const HEART_COUNT = 14
const MEMORY_IMAGES = [
  '01fb7ebb-1496-44c8-9854-5af7ec31e86c.jpg',
  '18db3623-4405-47df-b2ce-3f0ea4f2c9a8.jpg',
  '520cbd54-ff07-4b5a-a6c8-c2d3476ef62d.jpg',
  '581f2d40-b263-4788-9343-83fb2f126a61.jpg',
  '594d9b8f-d288-4414-96d0-4b7cf3efd36c.jpg',
  '5f5aef3c-b798-467c-b54f-cbcc684d24db.jpg',
  '71a692dd-e96a-43c8-bf6b-78ef6e722daa.jpg',
  '8bb3e225-438b-4ef7-9ec0-97e403da0ca6.jpg',
  '94fed631-dbaa-43a8-941b-221db277f79c.jpg',
  'a857b615-dedf-4b28-ba72-cad5666dbe22.jpg',
  'c3b16a03-856a-48f6-b9be-3bd84796b606.jpg',
  'c983c75e-cbe7-4ebf-ab66-c85c7cf710e0.jpg',
  'dd8f7f78-bbd4-4e77-a4e8-28b8681faea2.jpg',
]

function createHearts() {
  return Array.from({ length: HEART_COUNT }, (_, id) => {
    const size = 10 + Math.random() * 10
    return {
      id,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${size}px`,
    }
  })
}

function getNextBirthday() {
  const now = new Date()
  let target = new Date(now.getFullYear(), 8, 13, 0, 0, 0)

  if (target < now) {
    target = new Date(now.getFullYear() + 1, 8, 13, 0, 0, 0)
  }

  return target
}

function getCountdown() {
  const target = getNextBirthday()
  const now = new Date()
  const diff = target - now

  if (diff <= 0) {
    return {
      days: '00',
      hours: '00',
      mins: '00',
      secs: '00',
      note: "it's her birthday! 🎉",
    }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  const secs = Math.floor((diff / 1000) % 60)

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
    note: 'until September 13 🎂',
  }
}

function Hero() {
  const hearts = useMemo(createHearts, [])

  return (
    <div className="hero">
      <div className="stars"></div>
      <div className="sun"></div>

      <div className="hearts-float">
        {hearts.map((heart) => (
          <div
            className="heart"
            key={heart.id}
            style={{
              left: heart.left,
              bottom: '-5%',
              animationDuration: heart.animationDuration,
              animationDelay: heart.animationDelay,
              width: heart.size,
              height: heart.size,
            }}
          />
        ))}
      </div>

      <div className="hero-content">
        <div className="eyebrow-badge pixel">A SPECIAL QUEST FOR</div>
        <div className="hero-photo-frame">
          <img src={`/assets/${MEMORY_IMAGES[0]}`} alt="Mikee in her Minecraft world" />
          <span className="pixel">PLAYER 1</span>
        </div>
        <h1 className="hero-title pixel">
          Happy Birthday<br />Mikee
        </h1>
        <p className="ign-tag pixel">aka Fa1ryPrinc355</p>
        <p className="hero-sub">
          Loading 23 years of pure main-character energy — and a chapter that feels more real, more beautiful, and more like home 💛
        </p>
        <div className="scroll-hint pixel">↓ scroll ↓</div>
      </div>

      <div className="ground">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="block-col" key={index}>
            <div className="grass-top"></div>
            <div className="dirt-block"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Countdown() {
  const [countdown, setCountdown] = useState(getCountdown)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const slots = [
    ['days', 'DAYS'],
    ['hours', 'HRS'],
    ['mins', 'MIN'],
    ['secs', 'SEC'],
  ]

  return (
    <section>
      <div className="panel">
        <p className="section-title pixel">The countdown to your day</p>
        <div className="countdown-row">
          {slots.map(([key, label]) => (
            <div className="slot" key={key}>
              <span className="num pixel">{countdown[key]}</span>
              <span className="label pixel">{label}</span>
            </div>
          ))}
        </div>
        <p className="countdown-note">{countdown.note}</p>
      </div>
    </section>
  )
}

function Achievement() {
  return (
    <section className="alt">
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="achievement">
          <div className="ach-icon">🏆</div>
          <div className="ach-text">
            <span className="ach-title pixel">ACHIEVEMENT UNLOCKED</span>
            <span className="ach-sub">Level 23: Officially More Than Just a Crush</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Letter() {
  return (
    <section>
      <div className="letter-panel">
        <p className="letter-heading pixel">a letter for you</p>
        <div className="letter-body">
          <p>Mikee,</p>
          <p>When I met you, I met an amazing person — someone with the kind of interests and curiosity that make every conversation with you fun, and a kindness that I noticed almost right away. That combination is rare, and I don't think I say often enough how much it means to me.</p>
          <p>One of the things I love most about you is how amazing your taste is, especially when it comes to choosing movies and series. You somehow always pick something that feels fun, thoughtful, and memorable, and I love sharing those moments with you.</p>
          <p>Twenty-three looks so good on you already. Here's to another year of inside jokes, silly adventures, quiet nights in, and everything in between — including more Minecraft adventures like the ones we've had, building, exploring, and getting into trouble together. I want to build all of it with you.</p>
          <p>For your birthday, I also want to wish you the very best in your integrated class and in your future CPA journey. I know how hard you work, and I’m so proud of you. I hope you keep chasing your dreams with the same grace, determination, and heart you give to everyone around you — and I can’t wait to see you pass the CPALE and step into that future you deserve.</p>
          <p>Happy birthday, fa1ry pr1nc355. I hope today feels exactly as special as you make every day feel for me.</p>
        </div>
        <p className="letter-sign">— by Pejay</p>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="alt">
      <div className="panel">
        <p className="section-title pixel">memory chest</p>
        <div className="chest-grid">
          {MEMORY_IMAGES.slice(1).map((image, index) => (
            <div className="item-slot" key={index}>
              <img src={`/assets/${image}`} alt={`Memory ${index + 1}`} />
            </div>
          ))}
        </div>
        <p className="gallery-note">
          A little gallery of your favorite memories, unlocked just for your birthday 💛
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <p>made with a <span className="foot-heart">♥</span> and way too many browser tabs open</p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Hero />
      <Countdown />
      <Achievement />
      <Letter />
      <Gallery />
      <Footer />
    </>
  )
}
