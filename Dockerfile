FROM node:latest

ARG VITE_FB_ID
ARG VITE_GOOGLE_ID
ARG VITE_JW_LIVE_TV_ENGLISH
ARG VITE_JW_LIVE_TV_HINDI
ARG VITE_JW_LIVE_TV_BANGLA
ARG VITE_GA_ID
ARG VITE_PIN_INTEREST
ARG VITE_GOOGLE_SITE_VERFICATION
ARG VITE_APPLE_ID
ARG VITE_FB_APP_ID
ARG VITE_YANDEX_ID

# Create app directory
RUN mkdir -p /svelte/src
WORKDIR /svelte/src

# Installing PM2 globally
#RUN npm config set registry https://registry.npmmirror.com/ --global
RUN npm install --global pm2
#RUN npm config set registry https://registry.npmjs.org/ --global

# COPY ["package.json", "package-lock.json*", "/ultron/src/"]
# Copying source files
COPY . /svelte
RUN npm install --legacy-peer-deps

# Copying source file   
# COPY . /ultron

ENV VITE_FB_ID=${VITE_FB_ID}
ENV VITE_GOOGLE_ID=${VITE_GOOGLE_ID}
ENV VITE_JW_LIVE_TV_ENGLISH=${VITE_JW_LIVE_TV_ENGLISH}
ENV VITE_JW_LIVE_TV_HINDI=${VITE_JW_LIVE_TV_HINDI}
ENV VITE_JW_LIVE_TV_BANGLA=${VITE_JW_LIVE_TV_BANGLA}
ENV VITE_GA_ID=${VITE_GA_ID}
ENV VITE_PIN_INTEREST=${VITE_PIN_INTEREST}
ENV VITE_GOOGLE_SITE_VERFICATION=${VITE_GOOGLE_SITE_VERFICATION}
ENV VITE_APPLE_ID=${VITE_APPLE_ID}
ENV VITE_FB_APP_ID=${VITE_FB_APP_ID}
ENV VITE_YANDEX_ID=${VITE_YANDEX_ID}
ENV VITE_FB_PAGE_ID=${VITE_FB_PAGE_ID}

RUN npm run build
EXPOSE 8080

CMD ["npm", "run", "startpm2"]
