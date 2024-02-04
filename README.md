# Grimorio

Grimorio es una aplicación móvil desarrollada con React Native y TypeScript, utilizando Zustand para la gestión del estado y una arquitectura backend en Node.js y Express.

## Estructura del Proyecto

### Frontend

El frontend de Grimorio está construido con React Native y TypeScript. La estructura del proyecto es la siguiente:

#### Root Directory (/)

- App.tsx: Punto de entrada de la aplicación.
- /android y /ios: Carpetas específicas de la plataforma para código nativo.
- package.json: Dependencias y scripts del proyecto.
  
#### Source Directory (/src)

Contiene todo el código fuente de la aplicación.

- `/components` Componentes reutilizables.
- `/screens` Componentes de pantalla para cada vista de la aplicación.
- `/navigation` Configuraciones de navegación (stacks, tabs, etc.).
- `/services` Lógica de comunicación con el backend (APIs, servicios web).
- `/assets` Imágenes, fuentes y otros archivos estáticos.
- `/utils` Funciones de utilidad comunes y helpers.
- `/hooks` Hooks personalizados de React.
- `/context` Contextos de React (para state management).
- `/types` Definiciones de tipos de TypeScript específicos del proyecto.
  
### Configuraciones y Dotfiles

- `.eslintrc`, `.prettierrc` Configuraciones de ESLint y Prettier para el estilo del código.
- `tsconfig.json` Configuración de TypeScript.

## Creación de Pantallas y Tipado

Las pantallas en Grimorio se crean utilizando el patrón de componentes de React. Cada pantalla es un componente React que se define en la carpeta /screens. Utilizamos TypeScript para garantizar un tipado fuerte y mejorar la mantenibilidad del código.

Ejemplo de una pantalla (`LoginScreen.tsx`):

```tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // Lógica de la pantalla
};
```
En este ejemplo, LoginScreen es un componente funcional que utiliza TypeScript para definir las props. Utilizamos `React.FC` para tipar el componente funcional y `NativeStackNavigationProp` para tipar las props de navegación.

### Actualizar types.ts

Cuando se añade una nueva pantalla, se debe actualizar el archivo types.ts para reflejar los cambios en las rutas de navegación. Esto asegura un tipado fuerte y consistente en toda la aplicación, facilitando la gestión de las rutas y la navegación entre pantallas.

Ejemplo de `types.ts`:

```javascript
// src/types/types.ts
export type RootStackParamList = {
  Home: undefined;   // No se esperan parámetros para la pantalla Home
  Login: undefined;  // No se esperan parámetros para la pantalla Login
  Signup: undefined; // No se esperan parámetros para la pantalla Signup
  // ... puedes agregar más rutas y sus parámetros aquí
};
```

Cada vez que agregues o modifiques una pantalla, asegúrate de reflejar esos cambios aquí, agregando o modificando las rutas y los tipos de parámetros esperados.

## Tecnologías y Versiones

- React Native: 0.73.2
- TypeScript: 5.1.3
- Node.js y Express (versiones según `package.json`)
- Sequelize para PostgreSQL

## Instalación y Ejecución

Para instalar y ejecutar Grimorio en un entorno de desarrollo, sigue estos pasos:

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto y ejecuta npm install para instalar todas las dependencias.
3. Para ejecutar el proyecto en un emulador o dispositivo físico, utiliza los siguientes comandos:
    - `npm start` Inicia Expo.
    - `npm run android` Ejecuta la aplicación en un dispositivo/emulador Android.
    - `npm run ios` Ejecuta la aplicación en un dispositivo/emulador iOS.
    - `npm run web` Ejecuta la aplicación en un navegador web.

## Contribuir

Para contribuir al proyecto, considera lo siguiente:

- Realiza un fork del repositorio.
- Crea una nueva rama para tus cambios.
- Realiza tus cambios y escribe tests si es posible.
- Envía un pull request con tus cambios.
