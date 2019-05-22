<template>
    <nav class="navbar navbar-light menu">
        <a class="navbar-brand" href="#">Amazoon Careers</a>
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
        }
    }
</style>