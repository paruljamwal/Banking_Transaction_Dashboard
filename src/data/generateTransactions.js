import { TRANSACTION_TYPES } from '@constants/transactionTypes'
import { STATUS } from '@constants/status'

const ACCOUNT_HOLDERS = [
  { name: 'Parul Jamwal', accountNumber: '482917305628' },
  { name: 'Rahul Mehta', accountNumber: '739104582316' },
  { name: 'Ananya Sharma', accountNumber: '605821947103' },
  { name: 'Vikram Singh', accountNumber: '918374650289' },
  { name: 'Priya Nair', accountNumber: '274590183647' },
  { name: 'Arjun Kapoor', accountNumber: '853106729418' },
  { name: 'Sneha Reddy', accountNumber: '491827305916' },
  { name: 'Karan Malhotra', accountNumber: '628390174502' },
  { name: 'Divya Iyer', accountNumber: '705194826317' },
  { name: 'Rohan Desai', accountNumber: '382947105683' },
  { name: 'Meera Joshi', accountNumber: '519283746105' },
  { name: 'Aditya Verma', accountNumber: '847291036528' },
  { name: 'Kaveri Technologies Pvt Ltd', accountNumber: '102938475601' },
  { name: 'Northwind Solutions', accountNumber: '564738291045' },
  { name: 'BluePeak Retail LLP', accountNumber: '293847561029' },
]

const PAYMENT_METHODS = [
  'UPI',
  'Net Banking',
  'Debit Card',
  'Credit Card',
  'NEFT',
  'RTGS',
  'IMPS',
  'Digital Wallet',
]

const CATEGORIES = {
  [TRANSACTION_TYPES.INCOME]: [
    'Salary',
    'Freelance',
    'Investment Returns',
    'Interest',
    'Dividends',
    'Rental Income',
    'Business Revenue',
  ],
  [TRANSACTION_TYPES.EXPENSE]: [
    'Utilities',
    'Rent',
    'Shopping',
    'Healthcare',
    'Travel',
    'Food & Dining',
    'Education',
    'Insurance',
    'Subscriptions',
    'Office Supplies',
  ],
  [TRANSACTION_TYPES.REFUND]: [
    'E-commerce Refund',
    'Service Refund',
    'Tax Refund',
    'Insurance Claim',
    'Cancellation Refund',
  ],
  [TRANSACTION_TYPES.TRANSFER]: [
    'Internal Transfer',
    'External Transfer',
    'Vendor Payment',
    'Payroll Disbursement',
    'Fund Transfer',
  ],
}

const MERCHANTS = [
  'Amazon India',
  'Flipkart',
  'Swiggy',
  'Zomato',
  'Airtel',
  'Jio',
  'IRCTC',
  'MakeMyTrip',
  'Apollo Pharmacy',
  'BigBasket',
  'HDFC Life',
  'Tata Power',
  'Uber India',
  'BookMyShow',
  'Croma',
]

const EMPLOYERS = [
  'Kaveri Technologies Pvt Ltd',
  'Infosys Ltd',
  'TCS Digital',
  'Wipro Technologies',
  'HCL Tech',
  'Accenture India',
  'Northwind Solutions',
  'BluePeak Retail LLP',
]

const STATUS_WEIGHTS = [
  { value: STATUS.COMPLETED, weight: 75 },
  { value: STATUS.PENDING, weight: 15 },
  { value: STATUS.FAILED, weight: 10 },
]

const TYPE_WEIGHTS = [
  { value: TRANSACTION_TYPES.EXPENSE, weight: 42 },
  { value: TRANSACTION_TYPES.INCOME, weight: 22 },
  { value: TRANSACTION_TYPES.TRANSFER, weight: 24 },
  { value: TRANSACTION_TYPES.REFUND, weight: 12 },
]

/**
 * Seeded PRNG for reproducible mock data.
 * @param {number} seed
 */
function createSeededRandom(seed) {
  let state = seed

  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

/**
 * @param {() => number} random
 * @param {{ value: string, weight: number }[]} weights
 */
function pickWeighted(random, weights) {
  const total = weights.reduce((sum, item) => sum + item.weight, 0)
  let roll = random() * total

  for (const item of weights) {
    roll -= item.weight
    if (roll <= 0) return item.value
  }

  return weights[weights.length - 1].value
}

/**
 * @param {() => number} random
 * @param {unknown[]} array
 */
function pickRandom(random, array) {
  return array[Math.floor(random() * array.length)]
}

/**
 * @param {string} accountNumber
 * @returns {string}
 */
export function maskAccountNumber(accountNumber) {
  const lastFour = accountNumber.slice(-4)
  return `XXXX-XXXX-${lastFour}`
}

/**
 * @param {() => number} random
 * @param {number} index
 */
function generateTransactionId(random, index) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''

  for (let i = 0; i < 6; i += 1) {
    suffix += chars.charAt(Math.floor(random() * chars.length))
  }

  return `TXN-${String(index + 1).padStart(5, '0')}-${suffix}`
}

/**
 * @param {() => number} random
 * @param {string} type
 */
function generateAmount(random, type) {
  const ranges = {
    [TRANSACTION_TYPES.INCOME]: [15000, 280000],
    [TRANSACTION_TYPES.EXPENSE]: [120, 65000],
    [TRANSACTION_TYPES.REFUND]: [250, 32000],
    [TRANSACTION_TYPES.TRANSFER]: [2500, 750000],
  }

  const [min, max] = ranges[type]
  const raw = min + random() * (max - min)

  return Math.round(raw * 100) / 100
}

/**
 * @param {() => number} random
 */
function generateDate(random) {
  const end = new Date('2026-03-15T18:00:00')
  const start = new Date('2025-03-15T00:00:00')
  const timestamp =
    start.getTime() + random() * (end.getTime() - start.getTime())

  return new Date(timestamp).toISOString()
}

/**
 * @param {() => number} random
 * @param {string} type
 * @param {string} category
 * @param {string} accountHolder
 */
function generateDescription(random, type, category, accountHolder) {
  const templates = {
    [TRANSACTION_TYPES.INCOME]: [
      `${category} credited to ${accountHolder}`,
      `Monthly ${category.toLowerCase()} deposit`,
      `${category} payment received`,
    ],
    [TRANSACTION_TYPES.EXPENSE]: [
      `${category} payment via digital channel`,
      `Online purchase - ${category}`,
      `${category} bill settlement`,
    ],
    [TRANSACTION_TYPES.REFUND]: [
      `${category} processed successfully`,
      `Reversal for ${category.toLowerCase()}`,
      `${category} credited back`,
    ],
    [TRANSACTION_TYPES.TRANSFER]: [
      `${category} between accounts`,
      `Scheduled ${category.toLowerCase()}`,
      `${category} initiated by account holder`,
    ],
  }

  return pickRandom(random, templates[type])
}

/**
 * @param {() => number} random
 * @param {string} type
 * @param {{ name: string }} holder
 */
function generateParties(random, type, holder) {
  const externalAccount = pickRandom(random, ACCOUNT_HOLDERS)

  switch (type) {
    case TRANSACTION_TYPES.INCOME:
      return {
        sender: pickRandom(random, EMPLOYERS),
        receiver: holder.name,
      }
    case TRANSACTION_TYPES.EXPENSE:
      return {
        sender: holder.name,
        receiver: pickRandom(random, MERCHANTS),
      }
    case TRANSACTION_TYPES.REFUND:
      return {
        sender: pickRandom(random, MERCHANTS),
        receiver: holder.name,
      }
    case TRANSACTION_TYPES.TRANSFER:
      return {
        sender: holder.name,
        receiver:
          externalAccount.name === holder.name
            ? pickRandom(
                random,
                ACCOUNT_HOLDERS.filter((item) => item.name !== holder.name),
              ).name
            : externalAccount.name,
      }
    default:
      return { sender: holder.name, receiver: holder.name }
  }
}

/**
 * @param {number} [count]
 * @param {number} [seed]
 */
export function generateMockTransactions(count = 300, seed = 20260315) {
  const random = createSeededRandom(seed)

  return Array.from({ length: count }, (_, index) => {
    const holder = pickRandom(random, ACCOUNT_HOLDERS)
    const type = pickWeighted(random, TYPE_WEIGHTS)
    const status = pickWeighted(random, STATUS_WEIGHTS)
    const category = pickRandom(random, CATEGORIES[type])
    const { sender, receiver } = generateParties(random, type, holder)

    return {
      id: `txn_${String(index + 1).padStart(4, '0')}`,
      accountHolder: holder.name,
      accountNumber: maskAccountNumber(holder.accountNumber),
      transactionId: generateTransactionId(random, index),
      amount: generateAmount(random, type),
      transactionType: type,
      status,
      paymentMethod: pickRandom(random, PAYMENT_METHODS),
      category,
      date: generateDate(random),
      description: generateDescription(random, type, category, holder.name),
      receiver,
      sender,
    }
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
}
