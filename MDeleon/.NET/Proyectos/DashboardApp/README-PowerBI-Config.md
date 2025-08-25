# DashboardApp - Configuración de PowerBI

## Error Común: AADSTS900023

Si ves el error `AADSTS900023: Specified tenant identifier 'your_tenant_id' is neither a valid DNS name, nor a valid external domain`, significa que los valores de configuración de PowerBI son placeholders y necesitan ser reemplazados con valores reales.

## Configuración Requerida

### 1. Registrar una aplicación en Azure AD

1. Ve a [Azure Portal](https://portal.azure.com)
2. Navega a **Azure Active Directory** > **App registrations**
3. Haz clic en **New registration**
4. Completa:
   - **Name**: DashboardApp
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: No es necesario para aplicaciones de servidor
5. Haz clic en **Register**

### 2. Configurar la aplicación

#### Obtener Client ID y Tenant ID

- En la página **Overview** de tu aplicación, copia:
  - **Application (client) ID** → esto es tu `ClientId`
  - **Directory (tenant) ID** → esto es tu `TenantId`

#### Crear Client Secret

1. Ve a **Certificates & secrets**
2. Haz clic en **New client secret**
3. Agrega una descripción y selecciona expiración
4. Copia el **Value** → esto es tu `ClientSecret`

#### Configurar permisos para PowerBI

1. Ve a **API permissions**
2. Haz clic en **Add a permission**
3. Selecciona **Power BI Service**
4. Selecciona **Delegated permissions** y agrega:
   - `Report.Read.All`
   - `Dataset.Read.All`
   - `Workspace.Read.All`
5. Haz clic en **Grant admin consent**

### 3. Configurar la aplicación .NET

#### Opción A: Archivo appsettings.Development.json (Recomendado para desarrollo)

El archivo `appsettings.Development.json` ya está configurado con la estructura correcta. Solo necesitas reemplazar los valores:

```json
{
  "PowerBI": {
    "AuthorityUrl": "https://login.microsoftonline.com/common",
    "ClientId": "TU_CLIENT_ID_REAL_AQUI",
    "ClientSecret": "TU_CLIENT_SECRET_REAL_AQUI",
    "Scope": "https://analysis.windows.net/powerbi/api/.default",
    "ApiUrl": "https://api.powerbi.com/",
    "WorkspaceId": "7d6a114b-d2b1-41ef-8f5e-fbb2f1044f85",
    "ReportId": "cc8e0737-b6b1-48de-9c82-1794f93a09b7"
  }
}
```

#### Opción B: Variables de entorno

Crea un archivo `.env` basado en `.env.example` y configura las variables:

```bash
POWERBI_TENANT_ID=tu-tenant-id-real
POWERBI_CLIENT_ID=tu-client-id-real
POWERBI_CLIENT_SECRET=tu-client-secret-real
```

### 4. Obtener Workspace ID y Report ID de PowerBI

1. Ve a [PowerBI Service](https://app.powerbi.com)
2. Abre tu workspace
3. El **Workspace ID** está en la URL: `https://app.powerbi.com/groups/{WORKSPACE_ID}/`
4. Abre un reporte y el **Report ID** está en la URL: `https://app.powerbi.com/groups/{WORKSPACE_ID}/reports/{REPORT_ID}/`

## Notas de Seguridad

- **NUNCA** hagas commit de valores reales de `ClientSecret` al control de versiones
- Usa `appsettings.Development.json` para desarrollo y variables de entorno para producción
- Considera usar Azure Key Vault para almacenar secretos en producción

## Solución de Problemas

### Error: invalid_request

- Verifica que el `TenantId` sea correcto
- Asegúrate de que no uses placeholders como `YOUR_TENANT_ID`

### Error: unauthorized_client

- Verifica que el `ClientId` y `ClientSecret` sean correctos
- Asegúrate de que la aplicación tenga los permisos necesarios

### Error: insufficient_privileges

- Verifica que se haya otorgado consentimiento de administrador
- Asegúrate de que el usuario tenga acceso al workspace de PowerBI
