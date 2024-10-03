export interface User {
    id: number;                     
    name: string;                   
    email: string;                  
    password: string;               
    role: 'user' | 'admin';         
    created_at?: string;            
}




export interface Product {
    id: number;                
    name: string;             
    description?: string;     
    price: number;            
    stock?: number;           
    category: 'pollo' | 'pescado'
    created_at?: string;      
    image_url?: string; 

}