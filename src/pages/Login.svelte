<script>
    import loginUser from '../strapi/loginUser';
    import registerUser from '../strapi/registerUser';
    let email = '';
    let password = '';
    let username = 'default username';
    let isMember = true;

    $: isEmpty = !email || !password || !username;

    function toggleMember() {
        isMember = !isMember;
        if (!isMember) {
            username = '';
        } else {
            username = 'default username';
        }
    }

    async function handleSubmit() {
        let user;
        if (isMember) {
            loginUser();
        } else {
            registerUser();
        }
    }
</script>

<section class="form">
    <h2 class="section-title">{isMember ? 'sign in' : 'register'}</h2>
    <form class="login-form" on:submit|preventDefault={handleSubmit}>
        <!-- single imput -->
        <div class="form-control">
            <label for="email">email</label>
            <input type="email" id="email" bind:value={email} />
        </div>
        <!-- single imput -->
        <div class="form-control">
            <label for="password">password</label>
            <input type="password" id="password" bind:value={password} />
        </div>
        {#if !isMember}
            <!-- single imput -->
            <div class="form-control">
                <label for="username">user name</label>
                <input type="text" id="username" bind:value={username} />
            </div>
        {/if}
        {#if isEmpty}
            <p class="form-empty">please fill out all form fields</p>
        {/if}
        <button
            type="submit"
            class="btn btn-block"
            disabled={isEmpty}
            class:disabled={isEmpty}>
            submit
        </button>
        {#if isMember}
            <p class="register-link">
                need to register?
                <button type="button" on:click={toggleMember}>click</button>
            </p>
        {:else}
            <p class="register-link">
                already member?
                <button type="button" on:click={toggleMember}>click</button>
            </p>
        {/if}
    </form>
</section>
