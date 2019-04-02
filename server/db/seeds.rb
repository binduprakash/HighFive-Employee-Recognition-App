# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "Seeding HighFive App data ..."

# Helper functions
def open_asset(file_name)
  File.join('seed_assets', file_name)
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

################ EMPLOYEES CREATION ####################

Employee.destroy_all

ceo = Employee.create({
    first_name: 'David',
    last_name: 'Kelly',
    email: 'dkelly@lighthouse.com',
    password_digest: '1234',
    title: 'Cheif Executive Officer',
    img_url: open_asset('ceo_pic.jpg'),
    available_points: 0,
})

op_mgr = Employee.create({
    first_name: 'Clara',
    last_name: 'Gates',
    email: 'cgates@lighthouse.com',
    password_digest: '1234',
    title: 'Manager Operations',
    department: 'Operations',
    img_url: open_asset('op_mgr_pic.jpg'),
    manager: ceo,
    available_points: 0,
})

Employee.create({
    first_name: 'Peter',
    last_name: 'Cool',
    email: 'pcool@lighthouse.com',
    password_digest: '1234',
    title: 'Sales Ananlyst',
    department: 'Operations',
    img_url: open_asset('op_sales_pic.jpg'),
    manager: op_mgr,
    available_points: 1000,
})

Employee.create({
    first_name: 'Parker',
    last_name: 'Bill',
    email: 'pbill@lighthouse.com',
    password_digest: '1234',
    title: 'Account Consultant',
    department: 'Operations',
    img_url: open_asset('op_ac_pic.jpg'),
    manager: op_mgr,
    available_points: 500,
})

engg_mgr = Employee.create({
    first_name: 'Mark',
    last_name: 'Bud',
    email: 'mbud@lighthouse.com',
    password_digest: '1234',
    title: 'Manager Engineering',
    department: 'Engineering',
    img_url: open_asset('engg_mgr_pic.jpg'),
    manager: ceo,
    available_points: 0,
})

Employee.create({
    first_name: 'Parker',
    last_name: 'Don',
    email: 'pdon@lighthouse.com',
    password_digest: '1234',
    title: 'Software Engineer',
    department: 'Engineering',
    img_url: open_asset('eg_se_pic.jpg'),
    manager: engg_mgr,
    available_points: 1000,
})

Employee.create({
    first_name: 'Erin',
    last_name: 'Smith',
    email: 'esmith@lighthouse.com',
    password_digest: '1234',
    title: 'QA Engineer',
    department: 'Engineering',
    img_url: open_asset('eg_qa_pic.jpg'),
    manager: engg_mgr,
    available_points: 500,
})

puts ">> #{Employee.count} Employees Created"

PointsLevel.destroy_all

level1 = PointsLevel.create({
  level_name: 'Level 1',
  points: 100
})

level2 = PointsLevel.create({
  level_name: 'Level 2',
  points: 250
})

level3 = PointsLevel.create({
  level_name: 'Level 3',
  points: 500
})

level4 = PointsLevel.create({
  level_name: 'Level 4',
  points: 1000
})

level5 = PointsLevel.create({
  level_name: 'Level 5',
  points: 2000
})

puts ">> #{PointsLevel.count} Points Level Created"

RedeemItem.destroy_all

RedeemItem.create({
  name: 'Tim Hortons',
  points: 500,
  amount: 50.00,
  description: 'Tim Hortons Inc. is a fast food restaurant chain, specializing in coffee and donut items.',
  image_url: open_asset('tim_hortons_pic.jpg'),
})

RedeemItem.create({
  name: 'Udemy',
  points: 500,
  amount: 50.00,
  description: 'Udemy.com is an online learning platform. It is aimed at professional adults.',
  image_url: open_asset('udemy_pic.jpg'),
})

RedeemItem.create({
  name: 'Amazon',
  points: 500,
  amount: 50.00,
  description: 'Amazon.ca Gift Cards never expire and carry no fees. No returns and no refunds on gift cards. ',
  image_url: open_asset('amazon_pic.jpg'),
})

RedeemItem.create({
  name: 'Coursera',
  points: 500,
  amount: 50.00,
  description: 'Coursera is an online learning platform founded by Stanford professors.',
  image_url: open_asset('coursera_pic.jpg'),
})

RedeemItem.create({
  name: 'Earth Save Canada',
  points: 500,
  amount: 50.00,
  description: 'EARTHSAVE CANADA is a Vancouver based registered charity founded in 1989.',
  image_url: open_asset('earth_save_pic.jpg'),
})

RedeemItem.create({
  name: 'Canadian Red Cross',
  points: 500,
  amount: 50.00,
  description: 'The Canadian Red Cross Society is a Canadian humanitarian charitable organization, and one of 190 national Red Cross and Red Crescent societies.',
  image_url: open_asset('red_cross_pic.jpg'),
})

puts ">> #{RedeemItem.count} Redeem Item Created"



puts "Seeding Completed Successfully!"
