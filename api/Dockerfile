# STEP 1 - BUILD RELEASE 
FROM hexpm/elixir:1.14.0-erlang-24.3.4.7-alpine-3.16.3 AS build

# Set the environment variables from the .env file
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env


# Update the package manager and install dependencies
RUN mix local.rebar --force && \
    mix local.hex --force

ENV MIX_ENV=prod
WORKDIR /app

# Install elixir package dependencies
COPY mix.exs /app/mix.exs
COPY mix.lock /app/mix.lock
RUN mix do deps.get --only $MIX_ENV, deps.compile

# copy config, priv and release and application directories
COPY config /app/config
COPY priv /app/priv
COPY lib /app/lib

# compile app and create release
RUN mix do compile, release


####################################################################################################
# STEP 2 - FINAL
FROM alpine:3.16.3 as app

RUN apk add --no-cache openssl ncurses-libs && \
    apk add --no-cache libstdc++ libgcc

WORKDIR /app

RUN chown nobody:nobody /app

USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/api ./

ENV HOME=/app



CMD bin/api eval "Utils.Release.migrate" && bin/api start
