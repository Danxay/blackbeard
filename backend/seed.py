from database import SessionLocal
from models import Barber, Service

def seed_database():
    """Seed database with initial data"""
    db = SessionLocal()
    
    try:
        # Check if already seeded
        if db.query(Barber).first():
            return
        
        # Seed barbers
        barbers = [
            Barber(
                name="Алексей Петров",
                role="Топ-барбер",
                rating=4.9,
                reviews_count=156,
                experience="8 лет опыта",
                image="/images/barber1.jpg",
                is_available=True
            ),
            Barber(
                name="Дмитрий Козлов",
                role="Барбер",
                rating=4.8,
                reviews_count=89,
                experience="5 лет опыта",
                image="/images/barber2.jpg",
                is_available=True
            ),
            Barber(
                name="Иван Сидоров",
                role="Барбер",
                rating=4.7,
                reviews_count=67,
                experience="3 года опыта",
                image="/images/barber3.jpg",
                is_available=True
            ),
            Barber(
                name="Максим Волков",
                role="Стажёр",
                rating=4.5,
                reviews_count=23,
                experience="1 год опыта",
                image="/images/barber4.jpg",
                is_available=True
            ),
        ]
        db.add_all(barbers)
        
        # Seed services
        services = [
            Service(name="Стрижка", description="Классическая мужская стрижка", price=1500, duration=45, category="hair", icon="Scissors", popular=True),
            Service(name="Стрижка + борода", description="Стрижка и оформление бороды", price=2500, duration=75, category="combo", icon="Scissors", popular=True),
            Service(name="Борода", description="Оформление и стрижка бороды", price=1000, duration=30, category="beard", icon="Scissors", popular=True),
            Service(name="Королевское бритьё", description="Бритьё опасной бритвой", price=1200, duration=40, category="shave", icon="Brush"),
            Service(name="Камуфляж седины", description="Окрашивание седых волос", price=1500, duration=45, category="color", icon="Palette"),
            Service(name="Детская стрижка", description="Стрижка для детей до 12 лет", price=1000, duration=30, category="kids", icon="Baby"),
            Service(name="Укладка", description="Профессиональная укладка", price=500, duration=15, category="styling", icon="Wind"),
            Service(name="Мытьё головы", description="Мытьё с массажем", price=300, duration=10, category="wash", icon="Droplets"),
        ]
        db.add_all(services)
        
        db.commit()
        print("Database seeded successfully")
        
    except Exception as e:
        print(f"Seeding error: {e}")
        db.rollback()
    finally:
        db.close()
