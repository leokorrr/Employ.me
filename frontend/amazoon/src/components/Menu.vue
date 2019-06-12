<template>
    <nav class="navbar navbar-light menu">
        <router-link to="/" class="navbar-brand">Amazoon Careers</router-link>
    </nav>
</template>

<style lang="scss">
    $color-main: #185682;

    .menu{
        background-color: $color-main;

        & .navbar-brand {
            color: white;
            transition: .2s;

            &:hover{
                color: darken($color: white, $amount: 15%)
            }

            &:focus {
                color: darken($color: white, $amount: 15%);

                &:active {
                    color: darken($color: white, $amount: 15%)
                }
            }

            &:active {
                color: darken($color: white, $amount: 15%)
            }
        }
    }
</style>