## mmt_assignment
### 메멘토에이아이 FE 직무 사전 과제
---


- 개발환경
```
  System:
    OS: Windows 11 10.0.22631
    CPU: (16) x64 AMD Ryzen 7 7700 8-Core Processor              
  Binaries:
    Node: 18.18.0 
    Yarn: 1.22.21 
    npm: 10.2.1 
    pnpm: 8.10.5 
  Managers:
    pip3: 23.2.1 
  Utilities:
    Git: 2.42.0.
    Curl: 8.7.1 
  Virtualization:
    Docker: 26.1.1 
    Docker Compose: 2.27.0 
  IDEs:
    VSCode: 1.90.0
    webStorm: 2024.1.2
```

- 저장소 생성 및 push


- ts 및 웹팩 설정
```
npm i -D typescript ts-loader
npm i -D webpack webpack-cli webpack-dev-server
npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
npm i -D css-loader style-loader
npm i -D copy-webpack-plugin html-webpack-plugin
npm i -D @types/react @types/react-dom
```
 
- tsconfig.json 생성
```
tsc --init
```

- scripts 작성 및 테스트
 

- eslint + prettier 설정
```
npx eslint --init

√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ The React plugin doesn't officially support ESLint v9 yet. What would you like to do? · 8.x
√ Does your project use TypeScript? · typescript
√ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint@8.x, globals, @eslint/js, typescript-eslint, eslint-plugin-react
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
```

```
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

- .prettierrc.json 작성 및 eslint.config.mjs 에 prettier 설정


- module.css 방식으로 작성   


- 실행방법
1. node.js 설치
2. npm i
3. 개발모드: npm run dev
4. 빌드: npm run build
5. 프로덕션모드(빌드 이후): npm run serve

---

# 프론트엔드 개발 과제(메멘토 에이아이)

이 프로젝트는 Webpack 설정을 직접 구성하고, 주어진 요구사항에 따라 동작하는 드래그 앤 드롭 기능을 구현합니다. `react-beautiful-dnd` 라이브러리를 사용하여, 지정된 드래그 제약 조건을 만족하는 애플리케이션을 만들어야 합니다. 제공되는 최소 기능의 초기 파일을 기반으로 시작하여 아래의 목표들을 수행해야 합니다.

## 목표

- **Webpack 적용**: `react-scripts`를 사용하지 않고, Webpack을 직접 설정하여 React 애플리케이션을 구성합니다.
- **칼럼 확장**: 기존의 한 칼럼에서 네 개의 칼럼으로 확장합니다.
- **드래그 제약 조건 적용**: 특정 규칙에 따라 아이템의 드래그를 제한합니다.
- **멀티 드래그 기능 구현**: 여러 아이템을 동시에 선택하고 드래그하는 기능을 추가합니다.

### 1. Webpack 적용

이 과제에서는 `create-react-app`의 `react-scripts` 대신 직접 Webpack 설정을 구현해야 합니다. 초기 `index.tsx` 파일과 `webpack.config.js` 파일을 설정하여 React 애플리케이션을 빌드할 수 있도록 합니다.

### 2. 칼럼 확장

현재 애플리케이션은 하나의 칼럼만을 가지고 있습니다. 이를 네 개의 칼럼으로 확장하고 각 칼럼에는 독립적인 드래그 앤 드롭 영역이 있어야 합니다.

### 3. 드래그 제약 조건

- 첫 번째 칼럼에서 세 번째 칼럼으로는 아이템 이동이 불가능해야 합니다.
- 짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다.
- 이동할 수 없는 지점으로 아이템을 드래그 할 경우, 제약이 있음을 사용자가 알 수 있도록 합니다.
  (ex. 드래그 중인 아이템의 색상이 붉은색으로 변경됨 등)

### 4. 멀티 드래그 구현

사용자가 여러 아이템을 선택하고, 이를 다른 칼럼으로 함께 드래그하여 이동할 수 있어야 합니다.

## 개발 지침

- UX를 고려하여 사용자 친화적인 인터페이스를 설계하세요. (이를 위해 과제 목표 외 UI 및 기능을 추가하여도 좋습니다.)
- 1번 항목을 제외한 과제는 `react-beautiful-dnd` 외 다른 라이브러리를 사용할 수 없습니다.
- 단, 스타일은 본인이 자주 사용하는 스타일 사용(CSS-in-JS, tailwind 등)

## 제출 방법

완성된 프로젝트 코드를 Git 저장소에 올리고, 해당 저장소 링크를 제출하세요.

### 평가 기준

- Webpack 설정의 정확성
- 드래그 앤 드롭 기능의 정확한 구현
- 코드의 가독성 및 구조화
- 사용자 경험 및 인터페이스 디자인
