{
  inputs.nixpkgs.url = "nixpkgs";
  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      # Utilized by `nix develop`
      devShell.${system} = pkgs.mkShell {
        buildInputs = with pkgs; [
          bruno
          firefox-devedition
          nodejs_22
          openssl
          cacert
        ];
        shellHook = ''
          firefox-devedition &
          disown %1
          zsh
        '';
      };
    };
}
