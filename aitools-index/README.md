# AI Tools Index

这是一个基于 Vue 3 + Vite 构建的现代化 Web 应用项目。

## 技术栈

- Vue 3
- Vite
- Pinia (状态管理)
- Vue Router
- Vue I18n (国际化)
- SASS
- Axios

## 环境要求

- Node.js 16.0 或更高版本
- npm 7.0 或更高版本

### 安装 Node.js 和 npm

#### Windows 系统

1. 访问 Node.js 官网 https://nodejs.org/
2. 下载并安装 LTS（长期支持）版本
3. 安装时勾选"Automatically install the necessary tools"选项
4. 完成安装后，打开命令提示符（CMD）或 PowerShell，验证安装：
```bash
node --version
npm --version
```

#### macOS 系统

使用 Homebrew 安装：
```bash
# 安装 Homebrew（如果尚未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js（会自动包含 npm）
brew install node
```

#### Linux 系统

使用包管理器安装：

Ubuntu/Debian:
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

CentOS/RHEL:
```bash
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
```

验证安装：
```bash
node --version
npm --version
```

## 安装步骤

1. 克隆项目到本地
```bash
git clone https://github.com/sherlockhua/ai-tools
cd ai-tools/aitools-index
```

2. 安装依赖
```bash
npm install
```

## 开发

启动开发服务器：
```bash
npm run dev
```

开发服务器默认运行在 http://localhost:5173

## 构建

构建生产环境版本：
```bash
npm run build
```

构建后的文件将生成在 `dist` 目录中。

## 预览生产构建

预览生产构建版本：
```bash
npm run preview
```

## 项目结构

```
aitools-index/
├── src/            # 源代码目录
├── public/         # 静态资源
├── index.html      # HTML 模板
├── vite.config.js  # Vite 配置
└── package.json    # 项目依赖配置
```

## 开发规范

- 使用 Vue 3 组合式 API
- 使用 SASS 进行样式开发
- 使用 ESLint 进行代码规范检查
- 遵循 Vue 3 官方风格指南

## 许可证

[MIT License](LICENSE) 