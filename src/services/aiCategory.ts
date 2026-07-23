import { EXPENSE_CATEGORIES } from '../models/expense';

const HF_API_URL = 'https://api-inference.huggingface.co/models/MoritzLaurer/mDeBERTa-v3-base-mnli-xnli';

// Category descriptions and keywords in Spanish to improve classification
const CATEGORY_RULES: Record<string, { keywords: string[]; description: string }> = {
    'SuperMarket': {
        keywords: [
            'supermercado', 'exito', 'olimpica', 'd1', 'ara', 'carulla', 'jumbo', 'metro', 
            'comestibles', 'viveres', 'almacen', 'tienda', 'mercado', 'zapatoca', 'alkosto', 
            'merkakol', 'pricesmart', 'carne', 'pollo', 'pescado', 'huevos', 'leche', 'queso', 
            'arroz', 'aceite', 'pan', 'galletas', 'cafe', 'azucar', 'sal', 'granos', 'harina', 
            'pasta', 'cereales', 'yogurt', 'mantequilla', 'atun', 'salsa', 'snacks', 'gaseosa', 'cervezas', 'bebidas'
        ],
        description: 'Compra de víveres, alimentos y productos generales en supermercados o almacenes de cadena.'
    },
    'Utilities': {
        keywords: [
            'luz', 'agua', 'gas', 'internet', 'energia', 'claro', 'movistar', 'tigo', 'epm', 
            'acueducto', 'servicios', 'telefono', 'celular', 'netflix', 'spotify', 'suscripcion', 
            'factura', 'recibo', 'enel', 'vanti', 'etb', 'hbo', 'disney', 'amazon prime', 'youtube', 
            'recarga', 'plan', 'fibra', 'television', 'cable', 'parqueadero', 'peaje', 'gasolina', 'combustible'
        ],
        description: 'Pago de servicios públicos, internet, telefonía, streaming y facturas del hogar.'
    },
    'Fruver': {
        keywords: [
            'frutas', 'verduras', 'fruver', 'tomate', 'cebolla', 'papa', 'platano', 'manzana', 
            'banano', 'verdura', 'fruta', 'legumbre', 'plaza', 'ahuyama', 'lechuga', 'zanahoria', 
            'pepino', 'ajo', 'pimenton', 'repollo', 'coliflor', 'brocoli', 'papaya', 'fresa', 
            'mora', 'limon', 'naranja', 'mandarina', 'aguacate', 'cilantro', 'habichuela', 'arveja', 'mango', 'pera'
        ],
        description: 'Compra de frutas, verduras, legumbres y productos frescos.'
    },
    'House Tool': {
        keywords: [
            'herramienta', 'ferreteria', 'bombillo', 'pintura', 'arreglo', 'reparacion', 'hogar', 
            'casa', 'cerrojo', 'tornillo', 'llave', 'martillo', 'mantenimiento', 'foco', 'tuberia', 
            'chapa', 'bisagra', 'taladro', 'cinta', 'silicona', 'clavos', 'puerta', 'ventana', 'cerrajeria', 'carpinteria'
        ],
        description: 'Herramientas, ferretería, reparaciones y elementos para el mantenimiento del hogar.'
    },
    'Medicines': {
        keywords: [
            'medicamento', 'farmacia', 'pastilla', 'droga', 'medico', 'clinica', 'hospital', 
            'eps', 'dromedica', 'cruz verde', 'salud', 'vitamina', 'pastillas', 'medicina', 
            'crema', 'jarabe', 'bloqueador', 'acetaminofen', 'ibuprofeno', 'aspirina', 'termometro', 
            'curitas', 'gasa', 'alcohol', 'consultas', 'odontologia', 'dentista', 'oftalmologo', 'optica'
        ],
        description: 'Medicamentos, farmacia, citas médicas y productos para la salud.'
    },
    'Cleaning': {
        keywords: [
            'limpieza', 'aseo', 'jabon', 'cloro', 'detergente', 'desinfectante', 'papel higienico', 
            'escoba', 'trapero', 'suavizante', 'blanqueador', 'bolsas de basura', 'cepillo', 
            'shampoo', 'desodorante', 'crema dental', 'enjuague', 'toallas', 'esponja', 'fab', 
            'limpiador', 'ambientador', 'servilletas', 'pañitos', 'gel', 'rastrillo', 'cuchilla'
        ],
        description: 'Productos de aseo personal, limpieza del hogar y detergentes.'
    },
    'Others': {
        keywords: ['otros', 'varios', 'regalo', 'propina', 'donacion', 'emergencia', 'imprevisto'],
        description: 'Gastos generales que no encajan en ninguna otra categoría.'
    }
};

export async function predictCategory(expenseName: string): Promise<string> {
    const cleanName = expenseName.toLowerCase().trim();

    // 1. Keyword / Dictionary rule matching in Spanish (Immediate and works without API key)
    for (const [category, rule] of Object.entries(CATEGORY_RULES)) {
        for (const keyword of rule.keywords) {
            if (cleanName.includes(keyword)) {
                return category;
            }
        }
    }

    // 2. If no keyword matched, try Hugging Face API if API key is provided
    const apiKey = import.meta.env.VITE_HF_API_KEY;

    if (!apiKey) {
        return 'Others';
    }

    try {
        // Construct enriched hypotheses with descriptions for better zero-shot context
        const labelsWithDescriptions = EXPENSE_CATEGORIES.map(cat => {
            const desc = CATEGORY_RULES[cat]?.description || cat;
            return `${cat}: ${desc}`;
        });

        const response = await fetch(HF_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: expenseName,
                parameters: {
                    candidate_labels: labelsWithDescriptions,
                    hypothesis_template: "Este gasto corresponde a {}"
                }
            })
        });

        if (!response.ok) {
            return 'Others';
        }

        const data = await response.json();

        if (data && data.labels && data.labels.length > 0) {
            // Extract original category name from "CategoryName: Description"
            const topLabelWithDesc = data.labels[0];
            const originalCategory = topLabelWithDesc.split(':')[0].trim();
            if (EXPENSE_CATEGORIES.includes(originalCategory as any)) {
                return originalCategory;
            }
        }

        return 'Others';
    } catch (error) {
        console.error('Error predicting category with AI:', error);
        return 'Others';
    }
}
