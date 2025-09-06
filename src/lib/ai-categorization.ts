import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface TransactionData {
  name: string
  amount: number
  merchantName?: string
  date: string
}

export interface CategoryPrediction {
  category: string
  subcategory: string
  confidence: number
  reasoning: string
  suggestedProject?: string
}

const CONSTRUCTION_CATEGORIES = {
  MATERIALS: [
    'Home Depot', 'Lowe\'s', 'Menards', 'Sherwin-Williams', 'Benjamin Moore',
    'lumber', 'concrete', 'steel', 'roofing', 'siding', 'drywall', 'insulation',
    'flooring', 'tile', 'paint', 'hardware', 'plumbing supplies', 'electrical'
  ],
  SUBCONTRACTORS: [
    'plumbing', 'electrical', 'HVAC', 'roofing', 'flooring', 'painting',
    'drywall', 'landscaping', 'concrete', 'framing', 'insulation', 'tile'
  ],
  EQUIPMENT_RENTAL: [
    'United Rentals', 'Home Depot Tool Rental', 'Sunbelt', 'Equipment Rental',
    'excavator', 'bobcat', 'forklift', 'crane', 'generator', 'compressor'
  ],
  FUEL: [
    'Shell', 'Chevron', 'Exxon', 'BP', '76', 'Arco', 'gas station', 'fuel'
  ],
  OFFICE: [
    'office supplies', 'software', 'accounting', 'legal', 'insurance'
  ]
}

export async function categorizeTransaction(
  transaction: TransactionData
): Promise<CategoryPrediction> {
  try {
    const prompt = `
You are an expert accountant specializing in construction company finances. 
Analyze this transaction and categorize it for a construction business.

Transaction Details:
- Description: ${transaction.name}
- Merchant: ${transaction.merchantName || 'N/A'}
- Amount: $${Math.abs(transaction.amount)}
- Date: ${transaction.date}

Construction Industry Context:
- Materials: ${CONSTRUCTION_CATEGORIES.MATERIALS.join(', ')}
- Subcontractors: ${CONSTRUCTION_CATEGORIES.SUBCONTRACTORS.join(', ')}
- Equipment Rental: ${CONSTRUCTION_CATEGORIES.EQUIPMENT_RENTAL.join(', ')}
- Fuel: ${CONSTRUCTION_CATEGORIES.FUEL.join(', ')}
- Office/Admin: ${CONSTRUCTION_CATEGORIES.OFFICE.join(', ')}

Please categorize this transaction and respond with a JSON object containing:
- category: Primary category (Materials, Subcontractor, Equipment, Fuel, Office, Income, Other)
- subcategory: More specific category (e.g., "Lumber", "Plumbing", "Concrete", etc.)
- confidence: Number 0-1 indicating how confident you are
- reasoning: Brief explanation of why you chose this category
- suggestedProject: If this looks like it could be for a specific type of project, suggest it (Kitchen, Bathroom, Deck, etc.)

Focus on construction-specific categorization. Be precise and practical.
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 500,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    try {
      const parsed = JSON.parse(content) as CategoryPrediction
      return parsed
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        category: 'Other',
        subcategory: 'Uncategorized',
        confidence: 0.1,
        reasoning: 'Failed to parse AI response',
      }
    }
  } catch (error) {
    console.error('AI categorization error:', error)
    
    // Fallback to rule-based categorization
    return ruleBasedCategorization(transaction)
  }
}

function ruleBasedCategorization(transaction: TransactionData): CategoryPrediction {
  const name = transaction.name.toLowerCase()
  const merchant = transaction.merchantName?.toLowerCase() || ''
  
  // Materials
  if (name.includes('home depot') || name.includes('lowes') || name.includes('menards')) {
    return {
      category: 'Materials',
      subcategory: 'Hardware Store',
      confidence: 0.9,
      reasoning: 'Major home improvement retailer'
    }
  }
  
  if (name.includes('sherwin') || name.includes('benjamin moore') || name.includes('paint')) {
    return {
      category: 'Materials',
      subcategory: 'Paint & Finishes',
      confidence: 0.85,
      reasoning: 'Paint retailer or paint-related purchase'
    }
  }
  
  // Equipment
  if (name.includes('united rentals') || name.includes('sunbelt') || name.includes('rental')) {
    return {
      category: 'Equipment',
      subcategory: 'Equipment Rental',
      confidence: 0.9,
      reasoning: 'Equipment rental company'
    }
  }
  
  // Fuel
  if (name.includes('shell') || name.includes('chevron') || name.includes('exxon') || 
      name.includes('bp') || name.includes('76') || name.includes('gas')) {
    return {
      category: 'Fuel',
      subcategory: 'Vehicle Fuel',
      confidence: 0.85,
      reasoning: 'Gas station or fuel purchase'
    }
  }
  
  // Subcontractors (positive amounts often indicate payments to subs)
  if (transaction.amount < 0 && (name.includes('plumbing') || name.includes('electrical') || 
      name.includes('hvac') || name.includes('roofing'))) {
    return {
      category: 'Subcontractor',
      subcategory: 'Trade Services',
      confidence: 0.8,
      reasoning: 'Trade-specific service provider'
    }
  }
  
  // Income (positive amounts from clients)
  if (transaction.amount > 0) {
    return {
      category: 'Income',
      subcategory: 'Client Payment',
      confidence: 0.7,
      reasoning: 'Positive amount, likely client payment'
    }
  }
  
  return {
    category: 'Other',
    subcategory: 'Uncategorized',
    confidence: 0.1,
    reasoning: 'Could not determine category from available information'
  }
}