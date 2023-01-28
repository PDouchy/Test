"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[530], {
    78910: function(e, t, i) {
        i.d(t, {
            g: function() {
                return o
            }
        });
        var s = i(92839)
          , n = i(84045);
        class o {
            dispose() {
                var e;
                this.loop.onUpdate.remove(this.handleUpdate),
                this.loop.onFixedUpdate.remove(this.handleFixedUpdate),
                this.loop.dispose(),
                this.context.dispose(),
                null === (e = this.scene) || void 0 === e || e.dispose(),
                n.k.logDebug("[".concat(this.name, "] disposed."))
            }
            startLoop() {
                n.k.logDebug("[".concat(this.name, "] loop started.")),
                this.loop.isPaused() ? this.loop.resume() : this.loop.start()
            }
            pauseLoop() {
                this.loop.pause(),
                n.k.logDebug("[".concat(this.name, "] loop paused."))
            }
            resumeLoop() {
                this.loop.resume(),
                n.k.logDebug("[".concat(this.name, "] loop resumed."))
            }
            init(e) {
                e && (this.scene = this.initScene(e)),
                this.context.systems.forEachSystem(e=>e.init()),
                n.k.logDebug("[".concat(this.name, "] initialized."))
            }
            initScene(e) {
                let t = new e(this.context);
                return t.init(),
                t
            }
            addSystems(e) {
                for (let t of e)
                    this.context.systems.registerSystem(t)
            }
            getSystem(e) {
                return this.context.systems.getSystemOfType(e)
            }
            update() {
                this.context.systems.forEachSystem(e=>e.enabled && e.update())
            }
            fixedUpdate() {
                let e = this.context.state;
                (0,
                s.Vx)(1e3 * this.context.state.fixedUpdateElapsedTime),
                this.context.systems.forEachSystem(e=>e.enabled && e.fixedUpdate()),
                e.fixedUpdateElapsedTime += this.context.time.fixedDelta * e.timeScale
            }
            resetFixedUpdateElapsedTime() {
                this.context.state.fixedUpdateElapsedTime = 0
            }
            constructor(e, t) {
                this.name = "App",
                this.handleUpdate = ()=>{
                    this.update()
                }
                ,
                this.handleFixedUpdate = ()=>{
                    this.fixedUpdate()
                }
                ,
                this.context = e,
                this.loop = t,
                this.loop.onUpdate.add(this.handleUpdate),
                this.loop.onFixedUpdate.add(this.handleFixedUpdate)
            }
        }
    },
    7544: function(e, t, i) {
        i.d(t, {
            I: function() {
                return H
            }
        });
        var s = i(22183)
          , n = i(84045);
        class o {
            dispose() {
                this.forEachEntity(e=>e.dispose()),
                this.entities.clear()
            }
            add(e) {
                if (null == e)
                    throw Error("Entity argument is required");
                if (null == e.uuid)
                    throw Error("Entity requires an uuid");
                this.entities.has(e.uuid) ? n.k.logDebug("Entity is already registered: ${entity.uuid}") : (this.entities.set(e.uuid, e),
                this.onAddEntity.emit(e))
            }
            remove(e) {
                e && this.removeById(e.uuid)
            }
            removeById(e) {
                let t = this.getById(e);
                if (!t)
                    throw Error("Unknown entity id: ".concat(e));
                this.onRemoveEntity.emit(t),
                this.entities.delete(e)
            }
            getById(e) {
                return this.entities.get(e)
            }
            forEachEntity(e) {
                this.entities.forEach(e)
            }
            constructor() {
                this.onAddEntity = new s.M,
                this.onRemoveEntity = new s.M,
                this.entities = new Map
            }
        }
        var r = i(90283);
        class a {
            get length() {
                return this.components.length
            }
            dispose() {
                this.components.length = 0
            }
            addComponent(e) {
                this.components.push(e)
            }
            removeComponent(e) {
                let t = this.components.indexOf(e);
                t > -1 && this.components.splice(t, 1)
            }
            forEachComponent(e) {
                for (let t of this.components)
                    e(t)
            }
            getComponentAt(e) {
                return this.components[e]
            }
            constructor() {
                this.components = []
            }
        }
        class l {
            dispose() {
                for (let e of (this.destroyEventHandlers(),
                Object.values(this.componentsByType)))
                    e.dispose();
                this.componentsByType.clear(),
                this.allComponents.dispose()
            }
            registerComponent(e) {
                let t = e.constructor
                  , i = this.getOrCreateComponentList(t);
                i.addComponent(e),
                this.allComponents.addComponent(e),
                this.registerAncestorTypes(e, t)
            }
            unregisterComponent(e) {
                let t = e.constructor
                  , i = this.componentsByType.get(t);
                null == i || i.removeComponent(e),
                this.allComponents.removeComponent(e),
                this.unregisterAncestorTypes(e, t)
            }
            getComponentsOfType(e) {
                return this.componentsByType.get(e)
            }
            getComponentOfType(e) {
                let t = this.getComponentsOfType(e);
                return null == t ? void 0 : t.getComponentAt(0)
            }
            getAllComponents() {
                return this.allComponents
            }
            getOrCreateComponentList(e) {
                let t = this.componentsByType.get(e);
                return t || (t = new a,
                this.componentsByType.set(e, t)),
                t
            }
            registerAncestorTypes(e, t) {
                this.forEachAncestorType(e, t, t=>{
                    let i = this.getOrCreateComponentList(t);
                    i.addComponent(e)
                }
                )
            }
            unregisterAncestorTypes(e, t) {
                this.forEachAncestorType(e, t, t=>{
                    let i = this.componentsByType.get(t);
                    null == i || i.removeComponent(e)
                }
                )
            }
            forEachAncestorType(e, t, i) {
                let s = Object.getPrototypeOf(t);
                for (; s !== r.w; )
                    i(s),
                    s = Object.getPrototypeOf(s)
            }
            initializeEventHandlers() {
                this.entities.onAddEntity.add(this.handleEntityAdded),
                this.entities.onRemoveEntity.add(this.handleEntityRemoved)
            }
            destroyEventHandlers() {
                this.entities.onAddEntity.remove(this.handleEntityAdded),
                this.entities.onRemoveEntity.remove(this.handleEntityRemoved)
            }
            constructor(e) {
                this.componentsByType = new Map,
                this.allComponents = new a,
                this.handleEntityAdded = e=>{
                    e.forEachComponent(e=>{
                        this.registerComponent(e)
                    }
                    ),
                    e.onAddComponent.add(e=>{
                        this.registerComponent(e)
                    }
                    ),
                    e.onRemoveComponent.add(e=>{
                        this.unregisterComponent(e)
                    }
                    ),
                    e.transform && (e.transform.traverse(t=>{
                        t !== e.transform && t.entity.forEachComponent(e=>{
                            this.registerComponent(e)
                        }
                        )
                    }
                    ),
                    e.transform.onAddChild.add(e=>{
                        this.entities.add(e.entity)
                    }
                    ),
                    e.transform.onRemoveChild.add(e=>{
                        this.entities.remove(e.entity)
                    }
                    ))
                }
                ,
                this.handleEntityRemoved = e=>{
                    e.forEachComponent(e=>{
                        this.unregisterComponent(e)
                    }
                    )
                }
                ,
                this.entities = e,
                this.initializeEventHandlers()
            }
        }
        class h {
            dispose() {
                this.forEachSystem(e=>e.dispose()),
                this.systemsByType.clear(),
                this.allSystems.length = 0
            }
            registerSystem(e, t) {
                let i = e.constructor;
                this.systemsByType.set(i, e),
                void 0 !== t ? this.allSystems.splice(t, 0, e) : this.allSystems.push(e)
            }
            unregisterSystem(e) {
                let t = this.allSystems.indexOf(e);
                this.allSystems.splice(t, 1),
                this.systemsByType.delete(e.constructor)
            }
            getSystemOfType(e) {
                return this.systemsByType.get(e)
            }
            forEachSystem(e) {
                for (let t of this.allSystems)
                    e(t)
            }
            constructor() {
                this.systemsByType = new Map,
                this.allSystems = []
            }
        }
        var c = i(18297);
        class d {
            getOrCreate() {
                let e = this.pool.pop();
                return e ? (this.metrics.free -= 1,
                e) : (this.metrics.allocated += 1,
                this.prefabFunc())
            }
            free(e) {
                this.pool.push(e),
                this.metrics.free += 1
            }
            empty() {
                this.pool.length = 0,
                this.metrics.free = 0,
                this.metrics.allocated = 0
            }
            constructor(e) {
                this.metrics = {
                    allocated: 0,
                    free: 0
                },
                this.pool = [],
                this.prefabFunc = e
            }
        }
        var p = i(3361)
          , u = i(35233)
          , m = i(96995)
          , f = i(23206)
          , g = i(2064)
          , v = i(30823)
          , y = i(56459)
          , x = i(90070)
          , b = i(34871)
          , S = i(86529)
          , w = i(10469)
          , _ = i(60462);
        class T extends _.M {
            init() {
                let e = this.args.map
                  , t = this.args.color
                  , i = this.args.transparent || !1
                  , s = this.args.blending || m.bdR
                  , n = void 0 !== this.args.opacity ? this.args.opacity : 1
                  , o = void 0 === this.args.depthWrite || this.args.depthWrite
                  , r = this.args.material || new m.xeV({
                    map: e,
                    color: t,
                    transparent: i,
                    blending: s,
                    opacity: n,
                    depthWrite: o
                });
                this.size = void 0 !== this.args.size ? this.args.size : 1,
                this.material = r,
                this.sprite = new m.jyi(this.material),
                this.sprite.scale.setScalar(this.size),
                this.setObject3D(this.sprite)
            }
            constructor(...e) {
                super(...e),
                this.size = 1
            }
        }
        class C extends T {
            init() {
                super.init();
                let e = void 0 !== this.args.rotationSpeed ? this.args.rotationSpeed : .5;
                this.rotationSpeed = e
            }
            fixedUpdate(e, t) {
                if (this.material) {
                    var i;
                    this.material.rotation -= e.fixedDelta * this.rotationSpeed * t.timeScale;
                    let {z: s} = this.entity.transform.position
                      , n = m.M8C.clamp(m.M8C.mapLinear(s, -120, -80, 0, this.size), 0, this.size);
                    null === (i = this.sprite) || void 0 === i || i.scale.setScalar(n)
                }
            }
            constructor(...e) {
                super(...e),
                this.rotationSpeed = .5
            }
        }
        var P = i(60400)
          , E = i(60124)
          , M = i(24423)
          , R = i(81110);
        class A extends r.w {
            init() {
                let e = this.entity.getComponent(w.H);
                if (e) {
                    var t, i;
                    this.material = null === (t = e.mesh) || void 0 === t ? void 0 : t.material,
                    e.object3D && (this.mesh = e.object3D,
                    null === (i = e.object3D) || void 0 === i || i.position.set(0, 0, 0))
                }
            }
            update(e, t) {
                if (this.material) {
                    let i = e.elapsed * this.speed * t.timeScale;
                    this.material.uniforms.progress.value = i - Math.floor(i)
                }
                this.mesh && this.mesh.lookAt(this.front)
            }
            constructor(...e) {
                super(...e),
                this.speed = -.25,
                this.front = new m.Pa4(0,0,1)
            }
        }
        var D = i(2945)
          , k = i(62686);
        class O extends r.w {
            init() {
                var e;
                let t = this.entity.getComponent(w.H);
                this.material = null == t ? void 0 : null === (e = t.mesh) || void 0 === e ? void 0 : e.material
            }
            fixedUpdate(e, t) {
                this.material && t.playerPosition && (this.material.uniforms.pointLight.value.copy(t.playerPosition),
                this.material.uniforms.pointLight.value.z -= 5)
            }
        }
        var L = i(73008)
          , I = i(33442)
          , F = i(34551);
        function z(e) {
            let {id: t} = e
              , i = new f.J(t);
            return i.addComponent(v.w),
            i.addComponent(y.m),
            i.addComponent(I.J, {
                id: t
            }),
            (0,
            F.JD)(t, i),
            i
        }
        function U(e, t) {
            var i;
            let {id: s} = e
              , n = z(e)
              , o = c.P.includes(s)
              , r = null === (i = (0,
            g.r6)(s, t)) || void 0 === i ? void 0 : i.clone();
            return r && (r.material = (0,
            E.U)("toon", t),
            n.addComponent(w.H, {
                mesh: r
            }),
            n.addComponent(S.S, {
                mesh: r,
                outlineWidth: 2,
                color: 0
            })),
            o || n.addComponent(L.b),
            n
        }
        var B = i(39123);
        class G {
            dispose() {
                this.unregisterEvents(),
                this.emptyPools(),
                this.pools.clear()
            }
            emptyPools() {
                for (let e of Array.from(this.pools.keys())) {
                    var t;
                    null === (t = this.pools.get(e)) || void 0 === t || t.empty()
                }
            }
            create(e) {
                switch (e) {
                case "player_bayc":
                case "player_mayc":
                    return this.createPlayer(e);
                case "bayc":
                case "mayc":
                    return (0,
                    u._)(e, this.resources);
                case "collectible_1":
                case "collectible_2":
                case "collectible_3":
                case "collectible_4":
                case "collectible_5":
                case "collectible_6":
                case "collectible_7":
                case "collectible_8":
                case "collectible_9":
                case "collectible_10":
                case "collectible_11":
                case "collectible_12":
                case "collectible_13":
                case "collectible_14":
                case "collectible_15":
                case "collectible_16":
                case "collectible_17":
                case "collectible_18":
                case "collectible_19":
                case "collectible_20":
                case "collectible_21":
                case "collectible_22":
                case "collectible_23":
                case "collectible_24":
                case "collectible_25":
                    return this.createCollectible(Object.keys(c.IJ).find(t=>c.IJ[t] === e));
                case "disk":
                case "hex":
                case "lobe":
                case "alpha":
                case "o2":
                case "manifold":
                case "anti-matter":
                case "matter":
                case "pin":
                case "tater":
                case "valve":
                case "flex":
                case "arc":
                case "squeezer":
                case "jaws":
                case "hive":
                case "fusion":
                case "spore-drive":
                case "reflex":
                case "fuse":
                case "egg":
                case "donut":
                case "knobs":
                case "wiggler":
                case "spark":
                    return this.createCollectible(e);
                case "cable":
                case "cable2":
                case "grid":
                case "grid2":
                case "pipe":
                case "pipe2":
                case "pipe3":
                case "pipe4":
                case "pipe5":
                case "wood":
                case "wood2":
                case "wood3":
                case "wood4":
                    return this.createStaticObstacle(e);
                case "barrel":
                case "bin":
                case "car":
                case "christmastree":
                case "cone":
                case "cow":
                case "desk":
                case "firehydrant":
                case "freezer":
                case "lid":
                case "locker":
                case "metalsheet":
                case "neon":
                case "phonebooth":
                case "radiator":
                case "safe":
                case "speaker":
                case "trafficsign":
                case "trafficsign2":
                case "trafficsign3":
                case "trafficsign4":
                case "trafficsign5":
                case "trash":
                case "tv":
                case "wc":
                case "wheel":
                case "wheelbarrow":
                case "wheelchair":
                case "window":
                    return this.createFloatingObstacle(e);
                case "propeller":
                    return this.createPropeller(e);
                case "applecore":
                case "ball":
                case "bananapeel":
                case "beercan":
                case "bones":
                case "bottle":
                case "bottle2":
                case "cardboard":
                case "cardboard2":
                case "cigarette":
                case "cigarette2":
                case "cigarette3":
                case "fishcarcass":
                case "hotdog":
                case "magazine":
                case "meat":
                case "nail":
                case "nail2":
                case "pizza":
                case "pizzabox":
                case "plasticduck":
                case "sandwich":
                case "sausage":
                case "shoes":
                case "skateboard":
                case "soda":
                case "spraypaint":
                case "straw":
                case "syringe":
                case "tincan":
                case "tincan2":
                case "toiletpaper":
                case "toiletplunger":
                case "wrench":
                    return this.createTrashObject(e);
                case "segment1":
                case "segment2":
                case "segment3":
                case "segment4":
                case "segment5":
                case "segment6":
                case "segment7":
                    return this.createSegment(e);
                case "fx_bubbles":
                    return (0,
                    D.b)(this.resources);
                case "fx_bubble_trail":
                    return (0,
                    k.m)(this.resources);
                default:
                    throw Error("Unknown entity id: ".concat(e))
                }
            }
            createPlayer(e) {
                let t = e.split("_")[1];
                return (0,
                p.M)(t, this.resources)
            }
            getOrCreatePrefab(e, t) {
                return void 0 === this.pools.get(e) && this.pools.set(e, new d(t)),
                this.pools.get(e).getOrCreate().reset()
            }
            createCollectible(e) {
                return this.getOrCreatePrefab(e, ()=>(function(e, t) {
                    var i;
                    let s = new f.J(e)
                      , n = c.a4[e];
                    s.addComponent(v.w),
                    s.addComponent(y.m),
                    s.addComponent(b.b, {
                        id: e,
                        rarity: n
                    }),
                    s.addComponent(x.B, {
                        radius: 1
                    });
                    let o = c.IJ[e]
                      , r = Number.parseInt(o.split("_")[1], 10) - 1
                      , a = null === (i = (0,
                    g.dg)(r, t)) || void 0 === i ? void 0 : i.clone();
                    if (a) {
                        if (a.material = (0,
                        E.U)("collectible", t),
                        s.addComponent(w.H, {
                            mesh: a
                        }),
                        s.addComponent(S.S, {
                            mesh: a,
                            outlineWidth: 1.5,
                            transparent: !0
                        }),
                        n === M.uq.Legendary) {
                            let l = function(e) {
                                let t = new f.J("pickup_effect");
                                t.addComponent(v.w);
                                let i = (0,
                                g.Hp)("trail", e).clone()
                                  , s = (0,
                                g.Xh)("converging_lines", e);
                                return i && (i.anisotropy = 16,
                                i.flipY = !1,
                                i.wrapT = m.rpg),
                                s && (s.material = new R.i({
                                    color: 16628798,
                                    map: i
                                }),
                                t.addComponent(w.H, {
                                    mesh: s
                                }),
                                t.addComponent(A)),
                                t
                            }(t);
                            s.add(l)
                        }
                        s.addComponent(C, {
                            material: (0,
                            E.U)("sparkle_".concat(n), t),
                            size: 7
                        }),
                        s.addComponent(C, {
                            material: (0,
                            E.U)("sparkle_inner", t),
                            size: 2.8000000000000003
                        }),
                        s.addComponent(P.i, {
                            axes: new m.USm(1,1,1)
                        })
                    }
                    return s
                }
                )(e, this.resources))
            }
            createTrashObject(e) {
                return this.getOrCreatePrefab(e, ()=>(function(e, t) {
                    var i;
                    let {id: s, random: n} = e
                      , o = new f.J(s)
                      , r = null === (i = (0,
                    g.yp)(s, t)) || void 0 === i ? void 0 : i.clone();
                    return o.addComponent(v.w),
                    o.addComponent(y.m),
                    o.addComponent(L.b),
                    o.addComponent(P.i, {
                        axes: new m.USm(1,1,1),
                        rotationSpeed: .5 * n(),
                        rotationOffset: n()
                    }),
                    r && (r.material = (0,
                    E.U)("toon", t),
                    o.addComponent(w.H, {
                        mesh: r
                    })),
                    (0,
                    F.JD)(s, o),
                    o
                }
                )({
                    id: e,
                    random: this.context.random
                }, this.resources))
            }
            createFloatingObstacle(e) {
                return this.getOrCreatePrefab(e, ()=>(function(e, t) {
                    var i;
                    let {id: s, random: n} = e
                      , o = z(e)
                      , r = null === (i = (0,
                    g.ge)(s, t)) || void 0 === i ? void 0 : i.clone();
                    return r && (r.material = (0,
                    E.U)("toon", t),
                    o.addComponent(w.H, {
                        mesh: r
                    }),
                    o.addComponent(S.S, {
                        mesh: r,
                        outlineWidth: 1.5,
                        color: 0
                    })),
                    o.addComponent(L.b),
                    o.addComponent(B._),
                    o.addComponent(P.i, {
                        axes: new m.USm(1,1,1),
                        rotationSpeed: .5 * n(),
                        rotationOffset: n()
                    }),
                    o
                }
                )({
                    id: e,
                    random: this.context.random
                }, this.resources))
            }
            createStaticObstacle(e) {
                return this.getOrCreatePrefab(e, ()=>U({
                    id: e,
                    random: this.context.random
                }, this.resources))
            }
            createPropeller(e) {
                return this.getOrCreatePrefab(e, ()=>(function(e, t) {
                    let i = U(e, t);
                    return i.addComponent(P.i, {
                        axes: new m.USm(0,0,1),
                        rotationOffset: e.random()
                    }),
                    i
                }
                )({
                    id: e,
                    random: this.context.random
                }, this.resources))
            }
            createSegment(e) {
                return this.getOrCreatePrefab(e, ()=>(function(e, t) {
                    var i;
                    let s = new f.J(e)
                      , n = null === (i = (0,
                    g.ue)(e, t)) || void 0 === i ? void 0 : i.clone();
                    return s.addComponent(v.w),
                    s.addComponent(y.m),
                    s.addComponent(O),
                    n && (n.material = (0,
                    E.U)(e, t),
                    s.addComponent(w.H, {
                        mesh: n
                    }),
                    s.addComponent(S.S, {
                        mesh: n,
                        outlineWidth: 1,
                        color: 0
                    })),
                    s
                }
                )(e, this.resources))
            }
            registerEvents() {
                this.entities.onRemoveEntity.add(this.handleEntityRemoved)
            }
            unregisterEvents() {
                this.entities.onRemoveEntity.remove(this.handleEntityRemoved)
            }
            constructor(e) {
                this.pools = new Map,
                this.handleEntityRemoved = e=>{
                    var t;
                    null === (t = this.pools.get(e.name)) || void 0 === t || t.free(e)
                }
                ,
                this.context = e,
                this.entities = e.entities,
                this.resources = e.resources,
                this.registerEvents()
            }
        }
        var N = i(78249);
        class H {
            dispose() {
                this.entities.dispose(),
                this.components.dispose(),
                this.systems.dispose(),
                this.entityFactory.dispose()
            }
            resetRandomizer() {
                this.randomizer.reset()
            }
            getSeed() {
                return this.seed
            }
            constructor(e, t, i, s) {
                this.state = e,
                this.time = t,
                this.seed = s,
                this.resources = i,
                this.entities = new o,
                this.components = new l(this.entities),
                this.systems = new h,
                this.randomizer = new N.Z(s),
                this.random = ()=>this.randomizer.next(),
                this.entityFactory = new G(this)
            }
        }
    },
    6288: function(e, t, i) {
        i.d(t, {
            l: function() {
                return o
            }
        });
        var s = i(60069)
          , n = i(19295);
        class o {
            async load() {
                if (this.isLoading || this.isLoaded)
                    return Promise.resolve();
                this.isLoading = !0,
                this.resources = await (0,
                n.l)(),
                this.isLoading = !1,
                this.isLoaded = !0
            }
            setContainer(e) {
                this.container = e
            }
            start() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i];
                if (this.abortPendingStart) {
                    this.abortPendingStart = !1;
                    return
                }
                this.app || (this.app = this.createApp(),
                this.app.startLoop())
            }
            stop() {
                if (this.isLoading && (this.abortPendingStart = !0),
                this.app) {
                    var e;
                    null === (e = this.app) || void 0 === e || e.dispose(),
                    this.app = null
                }
            }
            constructor() {
                this.resources = new s.Y,
                this.isLoading = !1,
                this.isLoaded = !1,
                this.abortPendingStart = !1
            }
        }
    },
    82923: function(e, t, i) {
        i.d(t, {
            a: function() {
                return s
            }
        });
        class s {
            constructor() {
                this.fixedUpdateElapsedTime = 0
            }
        }
    },
    24575: function(e, t, i) {
        i.d(t, {
            D: function() {
                return c
            }
        });
        var s = i(96995)
          , n = i(76635)
          , o = i(82923)
          , r = i(24423)
          , a = i(18297)
          , l = i(27125);
        class h {
            constructor() {
                this.clicked = !1,
                this.pointerX = 0,
                this.pointerY = 0,
                this.movementX = 0,
                this.movementY = 0,
                this.normalizedPointerX = 0,
                this.normalizedPointerY = 0
            }
        }
        class c extends o.a {
            applyConfig(e) {
                let {character: t, booster: i=!1, tier: s="tier1"} = e
                  , n = l.tc.baseConfig.tierScoreModifier[s];
                this.character = t,
                i && (this.gameVars = Object.assign(this.gameVars, l.tc.boosterOverrides)),
                this.scoreMultiplier += n + this.gameVars.additionalScoreModifier,
                this.updateCollectibleRarityThresholds(),
                this.updateStats()
            }
            updateStats() {
                for (let e of Object.values(r.uq))
                    this.stats.itemsByRarity[e].pointsPerItem = this.gameVars.pointsPerCollectible[e]
            }
            updateCollectibleRarityThresholds() {
                let e = this.gameVars.collectibleSpawnRates
                  , t = 0
                  , i = 0;
                for (let s of Object.keys(e))
                    i > 0 && (t += Object.values(e)[i - 1]),
                    a.yd.set(s, t),
                    i += 1
            }
            constructor(e) {
                super(),
                this.tutorialModeStarted = !1,
                this.gameModeStarted = !1,
                this.character = r.zk.BAYC,
                this.inputs = new h,
                this.mode = r.GF.Idle,
                this.score = 0,
                this.basePoints = 0,
                this.destructionPoints = 0,
                this.collectiblePoints = 0,
                this.scoreMultiplier = 1,
                this.speed = 0,
                this.globalSpeedFactor = 1,
                this.dashing = !1,
                this.dashAvailable = !0,
                this.dashCooldownProgress = 1,
                this.dashFactor = 0,
                this.timeScale = 1,
                this.chunkIndex = 0,
                this.playerPosition = new s.Pa4,
                this.collectibles = {
                    total: 0,
                    common: 0,
                    uncommon: 0,
                    rare: 0,
                    epic: 0,
                    legendary: 0
                },
                this.collectedItems = {},
                this.gameVars = (0,
                n.cloneDeep)(l.tc.baseConfig),
                this.stats = {
                    itemsByRarity: {
                        common: {
                            spawnedCount: 0,
                            collectedCount: 0,
                            pointsPerItem: 0
                        },
                        uncommon: {
                            spawnedCount: 0,
                            collectedCount: 0,
                            pointsPerItem: 0
                        },
                        rare: {
                            spawnedCount: 0,
                            collectedCount: 0,
                            pointsPerItem: 0
                        },
                        epic: {
                            spawnedCount: 0,
                            collectedCount: 0,
                            pointsPerItem: 0
                        },
                        legendary: {
                            spawnedCount: 0,
                            collectedCount: 0,
                            pointsPerItem: 0
                        }
                    },
                    bonusItems: {
                        spawnedCount: 0,
                        collectedCount: 0
                    },
                    obstacles: {
                        spawnedCount: 0,
                        destroyedCount: 0
                    }
                },
                this.applyConfig(e)
            }
        }
    },
    27125: function(e, t, i) {
        i.d(t, {
            Yh: function() {
                return o
            },
            tc: function() {
                return n
            },
            U0: function() {
                return r
            }
        });
        var s = i(76635);
        let n = JSON.parse('{"baseConfig":{"pointsPerSecond":125,"pointsPerObstacleDestroyed":400,"pointsPerCollectible":{"common":300,"uncommon":500,"rare":1000,"epic":1500,"legendary":2000},"dashRefillDuration":3,"collectibleSpawnRates":{"common":0.4,"uncommon":0.3,"rare":0.15,"epic":0.1,"legendary":0.05},"tierScoreModifier":{"tier1":0,"tier2":0.1,"tier3":0.2,"tier4":0.3},"additionalScoreModifier":0},"boosterOverrides":{"additionalScoreModifier":0.15,"dashRefillDuration":1.5,"collectibleSpawnRates":{"common":0.2,"uncommon":0.2,"rare":0.25,"epic":0.2,"legendary":0.15}}}')
          , o = (0,
        s.cloneDeep)(n);
        function r(e) {
            n = e
        }
    },
    55286: function(e, t, i) {
        i.d(t, {
            Dw: function() {
                return a
            },
            Er: function() {
                return f
            },
            HN: function() {
                return d
            },
            IH: function() {
                return c
            },
            IW: function() {
                return p
            },
            Mu: function() {
                return u
            },
            RY: function() {
                return h
            },
            Xs: function() {
                return g
            },
            Xx: function() {
                return v
            },
            li: function() {
                return m
            },
            vk: function() {
                return l
            },
            xX: function() {
                return y
            }
        });
        var s = i(96995)
          , n = i(24423)
          , o = i(18297)
          , r = i(3005);
        function a(e) {
            let t = n.uq.Common
              , i = e();
            for (let s of Array.from(o.yd.keys())) {
                let r = o.yd.get(s);
                void 0 !== r && i >= r && (t = s)
            }
            return t
        }
        function l(e, t) {
            return s.M8C.mapLinear(t(), 0, 1, r.dz, r.tR)
        }
        function h(e, t) {
            return s.M8C.mapLinear(t(), 0, 1, r.QH, r.uL)
        }
        function c(e, t) {
            return s.M8C.mapLinear(t(), 0, 1, r.yf, r.DD)
        }
        function d(e, t) {
            return t() * r.yg
        }
        function p(e) {
            let t = r.QB
              , i = r.ES;
            return t + e * i
        }
        function u(e, t) {
            let i = o.w2[t.name]
              , n = s.M8C.mapLinear(i, 1, 5, 1, 2)
              , r = Math.pow(e.speed, 1.2) / 100 / n;
            return r
        }
        function m(e, t) {
            let i = o.w2[t.name]
              , n = s.M8C.mapLinear(i, 1, 5, 1, 3)
              , r = .002 * e.speed / n;
            return r
        }
        function f(e) {
            let t = o.w2[e.name]
              , i = s.M8C.mapLinear(t, 1, 5, .02, .12);
            return i
        }
        function g(e, t) {
            let {pointsPerSecond: i} = e.gameVars;
            return Math.round(i * t)
        }
        function v(e) {
            return e.gameVars.pointsPerObstacleDestroyed
        }
        function y(e, t) {
            return e.gameVars.pointsPerCollectible[t]
        }
    },
    34895: function(e, t, i) {
        i.d(t, {
            Fv: function() {
                return v
            },
            NA: function() {
                return y
            },
            Rj: function() {
                return f
            },
            cs: function() {
                return g
            },
            lA: function() {
                return x
            }
        });
        var s = i(92839)
          , n = i(80899)
          , o = i(84681)
          , r = i(21043)
          , a = i(28076)
          , l = i(19431)
          , h = i(82115)
          , c = i(3868)
          , d = i(5274)
          , p = i(50710)
          , u = i(77239)
          , m = i(79118);
        function f(e) {
            let t = e.state
              , i = e.components.getComponentOfType(a.J)
              , s = e.components.getComponentOfType(m.H)
              , r = P(e);
            T(e, d.E),
            T(e, h.z),
            T(e, o.b),
            T(e, n.$),
            T(e, p.j),
            T(e, c.s),
            s.enabled = !1,
            i.entity.transform.position.z = 10,
            t.speed = 10,
            r && r.classList.remove("desaturated")
        }
        function g(e) {
            let t = e.state
              , i = e.components.getComponentOfType(m.H);
            t.chunkIndex = 0,
            C(e, d.E),
            C(e, p.j),
            C(e, o.b),
            C(e, c.s),
            t.globalSpeedFactor = .25,
            new s.kX(e.state).to({
                globalSpeedFactor: 1
            }, 2e3).easing(s.oY.Quadratic.Out).start(1e3 * e.state.fixedUpdateElapsedTime),
            i.enabled = !0,
            w(e)
        }
        function v(e) {
            let t = e.state
              , i = e.components.getComponentOfType(m.H)
              , s = e.systems.getSystemOfType(r.t);
            t.globalSpeedFactor = 1,
            t.fixedUpdateElapsedTime = 0,
            t.chunkIndex = 0,
            e.resetRandomizer(),
            s.emptyQueue(),
            e.entityFactory.emptyPools(),
            s.initQueue(),
            C(e, d.E),
            C(e, h.z),
            C(e, n.$),
            C(e, o.b),
            C(e, c.s),
            i.enabled = !0,
            w(e)
        }
        function y(e) {
            let t = e.state
              , i = P(e);
            T(e, d.E),
            T(e, o.b),
            T(e, n.$),
            T(e, r.t),
            T(e, c.s),
            T(e, h.z),
            b(e),
            S(e),
            t.speed = 0,
            t.globalSpeedFactor = 0,
            i && i.classList.add("desaturated")
        }
        function x(e) {
            let t = e.state
              , i = P(e);
            T(e, p.j),
            T(e, d.E),
            T(e, o.b),
            T(e, r.t),
            T(e, c.s),
            b(e),
            S(e),
            t.speed = 0,
            t.globalSpeedFactor = 0,
            i && i.classList.add("desaturated")
        }
        function b(e) {
            let t = e.components.getComponentOfType(l.V)
              , i = t.entity.transform.position;
            new s.kX(i).to({
                z: i.z - 1
            }, 3e3).easing(s.oY.Exponential.Out).start(1e3 * e.state.fixedUpdateElapsedTime)
        }
        function S(e) {
            return new s.kX(e.state).to({
                timeScale: 0
            }, 1e3).easing(s.oY.Exponential.Out).start(1e3 * e.state.fixedUpdateElapsedTime)
        }
        async function w(e) {
            let t = e.components.getComponentOfType(a.J)
              , {position: i} = t.entity.transform;
            return i.y = -2,
            i.z = 10,
            new Promise(t=>{
                new s.kX(i).to({
                    y: 0,
                    z: 0
                }, 2e3).easing(s.oY.Quadratic.Out).onComplete(t).start(1e3 * e.state.fixedUpdateElapsedTime)
            }
            )
        }
        function _(e, t, i) {
            let s = e.systems.getSystemOfType(t);
            s && (s.enabled = i)
        }
        function T(e, t) {
            _(e, t, !1)
        }
        function C(e, t) {
            _(e, t, !0)
        }
        function P(e) {
            let t = e.systems.getSystemOfType(u.K)
              , i = null;
            if (t) {
                let s = t.renderer;
                i = null == s ? void 0 : s.getCanvas()
            }
            return i
        }
    },
    94773: function(e, t, i) {
        i.d(t, {
            p: function() {
                return b
            }
        });
        var s = i(22183)
          , n = i(60069)
          , o = i(78910)
          , r = i(24575);
        class a {
            dispose() {}
            start() {
                this.time.fixedDelta = this.timeInterval,
                0 === this.framerate ? this.runInstantly() : this.runWithInterval()
            }
            pause() {}
            resume() {}
            isPaused() {
                return !1
            }
            setFramerate(e) {
                this.framerate = e
            }
            runInstantly() {
                for (let e = 0; e < this.iterations; e += 1)
                    if (this.shouldContinue())
                        this.iterate();
                    else
                        break;
                this.onComplete.emit()
            }
            runWithInterval() {
                let e = 0
                  , t = setInterval(()=>{
                    this.iterate(),
                    (e += 1) !== this.iterations && this.shouldContinue() || (clearInterval(t),
                    this.onComplete.emit())
                }
                , this.framerate)
            }
            iterate() {
                this.onUpdate.emit(),
                this.onFixedUpdate.emit(),
                this.time.elapsed += this.timeInterval
            }
            constructor(e, t, i, n, o=0) {
                this.onStart = new s.M,
                this.onUpdate = new s.M,
                this.onFixedUpdate = new s.M,
                this.onPause = new s.M,
                this.onResume = new s.M,
                this.onComplete = new s.M,
                this.iterations = e,
                this.timeInterval = i,
                this.time = n,
                this.framerate = o,
                this.shouldContinue = t
            }
        }
        class l {
            dispose() {}
            update() {}
            pause() {}
            resume() {}
            constructor() {
                this.fixedDelta = 0,
                this.delta = 0,
                this.elapsed = 0
            }
        }
        var h = i(7544)
          , c = i(16602)
          , d = i(82115)
          , p = i(3868)
          , u = i(45567)
          , m = i(21043)
          , f = i(84681)
          , g = i(24423)
          , v = i(80545)
          , y = i(34895)
          , x = i(21434);
        class b extends o.g {
            start() {
                this.init(v.F),
                (0,
                y.Rj)(this.context),
                (0,
                y.Fv)(this.context),
                this.startLoop()
            }
            constructor(e, t=new n.Y) {
                let {config: i, history: o} = e
                  , v = i.seed
                  , y = new r.D(i)
                  , b = new l
                  , S = new h.I(y,b,t,v)
                  , w = (0,
                x.Kd)(o)
                  , _ = new a(w.length,()=>this.shouldLoopContinue,1 / 60,b);
                super(S, _),
                this.onValidationComplete = new s.M,
                this.name = "Validator",
                this.shouldLoopContinue = !0;
                let T = [new c.H(S,w), new f.b(S), new m.t(S), new u.d(S), new p.s(S), new d.z(S)];
                this.addSystems(T),
                y.mode = g.GF.Game,
                _.onComplete.add(()=>{
                    this.onValidationComplete.emit()
                }
                );
                let C = S.systems.getSystemOfType(d.z);
                C.onPlayerDeath.add(()=>{
                    this.shouldLoopContinue = !1
                }
                )
            }
        }
    },
    30823: function(e, t, i) {
        i.d(t, {
            w: function() {
                return r
            }
        });
        var s = i(96995)
          , n = i(22183)
          , o = i(90283);
        class r extends o.w {
            get position() {
                return this.object3D.position
            }
            get rotation() {
                return this.object3D.rotation
            }
            get scale() {
                return this.object3D.scale
            }
            get parent() {
                let e = this.object3D.parent;
                return e ? e.userData.transform : null
            }
            get children() {
                let e = this.object3D.children.filter(e=>e.userData.transform instanceof r);
                return e.map(e=>e.userData.transform)
            }
            init() {
                let e = this.args.position
                  , t = this.args.rotation
                  , i = this.args.scale;
                e && this.position.copy(e),
                t && this.rotation.copy(t),
                i && this.scale.copy(i),
                this.object3D.userData.transform = this
            }
            dispose() {
                let {parent: e} = this.object3D;
                e && e.remove(this.object3D)
            }
            reset() {
                this.position.set(0, 0, 0),
                this.rotation.set(0, 0, 0),
                this.scale.set(1, 1, 1)
            }
            getObject3D() {
                return this.object3D
            }
            copy(e) {
                this.object3D.copy(e.getObject3D())
            }
            lookAt(e) {
                this.object3D.lookAt(e)
            }
            add(e) {
                e.parent && e.parent !== this && e.parent.onRemoveChild.emit(e),
                e.parent !== this && (this.object3D.add(e.object3D),
                this.onAddChild.emit(e))
            }
            remove(e) {
                e.parent === this && (this.onRemoveChild.emit(e),
                this.object3D.remove(e.object3D))
            }
            traverse(e) {
                this.object3D.traverse(t=>{
                    let i = t.userData.transform;
                    i instanceof r && e(i)
                }
                )
            }
            constructor(...e) {
                super(...e),
                this.onAddChild = new n.M,
                this.onRemoveChild = new n.M,
                this.object3D = new s.Tme
            }
        }
    },
    60400: function(e, t, i) {
        i.d(t, {
            i: function() {
                return o
            }
        });
        var s = i(96995)
          , n = i(90283);
        class o extends n.w {
            init() {
                let e = this.args.axes
                  , t = this.args.rotationSpeed || 1
                  , i = this.args.rotationOffset || 0;
                this.axes = e,
                this.rotationSpeed = t,
                this.rotationOffset = i
            }
            fixedUpdate(e, t) {
                let {rotation: i} = this.entity.transform
                  , s = t.fixedUpdateElapsedTime * this.rotationSpeed + this.rotationOffset;
                i.x = this.axes.x * s,
                i.y = this.axes.y * s,
                i.z = this.axes.z * s
            }
            constructor(...e) {
                super(...e),
                this.axes = new s.USm,
                this.rotationSpeed = 1,
                this.rotationOffset = 0
            }
        }
    },
    19431: function(e, t, i) {
        i.d(t, {
            V: function() {
                return o
            }
        });
        var s = i(96995)
          , n = i(90283);
        class o extends n.w {
            init() {
                let e = this.args.renderer
                  , t = this.args.aspect;
                e && (this.renderer = e,
                this.setAspectRatio(t || function(e) {
                    let[t,i] = e;
                    return t / i
                }(e.getSize())),
                this.renderer.onResize.add(this.handleRendererResize)),
                this.entity.transform.getObject3D().add(this.camera)
            }
            dispose() {
                var e;
                null === (e = this.renderer) || void 0 === e || e.onResize.remove(this.handleRendererResize)
            }
            setAspectRatio(e) {
                this.camera.aspect = e,
                this.camera.updateProjectionMatrix()
            }
            getInternalCamera() {
                return this.camera
            }
            setFov(e) {
                this.camera.fov = e,
                this.camera.updateProjectionMatrix()
            }
            constructor(...e) {
                super(...e),
                this.camera = new s.cPb(60),
                this.handleRendererResize = e=>{
                    this.setAspectRatio(e[0] / e[1])
                }
            }
        }
    },
    26013: function(e, t, i) {
        i.d(t, {
            D: function() {
                return r
            }
        });
        var s = i(96995)
          , n = i(50563)
          , o = i(95464);
        class r extends o.Y {
            init() {
                let e = this.args.box
                  , t = this.args.position
                  , i = this.args.rotation;
                e.getSize(this.halfSize),
                this.halfSize.multiplyScalar(.5),
                t && this.localPosition.fromArray(t),
                i && (this.localEulerAngles.fromArray(i),
                this.localEulerAngles.order = "YZX"),
                this.calculateOBB()
            }
            intersectsOBB(e) {
                return this.obb.intersectsOBB(e)
            }
            intersectsSphere(e) {
                return this.obb.intersectsSphere(e)
            }
            calculateOBB() {
                let {transform: e} = this.entity;
                this.rotMatrix4.makeRotationFromEuler(e.rotation),
                this.parentRotationMatrix.setFromMatrix4(this.rotMatrix4),
                this.tmpVec3.copy(this.localPosition).applyMatrix3(this.parentRotationMatrix),
                this.center.addVectors(e.position, this.tmpVec3),
                this.rotMatrix4.makeRotationFromEuler(this.localEulerAngles),
                this.localRotationMatrix.setFromMatrix4(this.rotMatrix4),
                this.rotMatrix3.multiplyMatrices(this.parentRotationMatrix, this.localRotationMatrix),
                this.obb.set(this.center, this.halfSize, this.rotMatrix3)
            }
            fixedUpdate() {
                this.calculateOBB()
            }
            constructor(...e) {
                super(...e),
                this.obb = new n.T,
                this.localPosition = new s.Pa4,
                this.localEulerAngles = new s.USm,
                this.halfSize = new s.Pa4,
                this.rotMatrix4 = new s.yGw,
                this.parentRotationMatrix = new s.Vkp,
                this.localRotationMatrix = new s.Vkp,
                this.rotMatrix3 = new s.Vkp,
                this.tmpVec3 = new s.Pa4,
                this.center = new s.Pa4
            }
        }
    },
    95464: function(e, t, i) {
        i.d(t, {
            Y: function() {
                return n
            }
        });
        var s = i(90283);
        class n extends s.w {
            intersectsSphere(e) {
                return !1
            }
            intersectsOBB(e) {
                return !1
            }
        }
    },
    90070: function(e, t, i) {
        i.d(t, {
            B: function() {
                return o
            }
        });
        var s = i(96995)
          , n = i(95464);
        class o extends n.Y {
            init() {
                let e = this.args.radius
                  , t = this.args.position;
                this.radius = e,
                t && this.localPosition.fromArray(t),
                this.updateSphere()
            }
            intersectsOBB(e) {
                return e.intersectsSphere(this.sphere)
            }
            intersectsSphere(e) {
                return this.sphere.intersectsSphere(e)
            }
            updateSphere() {
                let {transform: e} = this.entity;
                this.rotMatrix4.makeRotationFromEuler(e.rotation),
                this.parentRotationMatrix.setFromMatrix4(this.rotMatrix4),
                this.center.copy(this.localPosition).applyMatrix3(this.parentRotationMatrix),
                this.center.add(e.position),
                this.sphere.set(this.center, this.radius)
            }
            fixedUpdate() {
                this.updateSphere()
            }
            constructor(...e) {
                super(...e),
                this.sphere = new s.aLr,
                this.radius = 1,
                this.rotMatrix4 = new s.yGw,
                this.parentRotationMatrix = new s.Vkp,
                this.localPosition = new s.Pa4,
                this.center = new s.Pa4
            }
        }
    },
    34871: function(e, t, i) {
        i.d(t, {
            b: function() {
                return n
            }
        });
        var s = i(90283);
        class n extends s.w {
            init() {
                this.id = this.args.id,
                this.rarity = this.args.rarity
            }
        }
    },
    39123: function(e, t, i) {
        i.d(t, {
            _: function() {
                return n
            }
        });
        var s = i(90283);
        class n extends s.w {
        }
    },
    33442: function(e, t, i) {
        i.d(t, {
            J: function() {
                return n
            }
        });
        var s = i(90283);
        class n extends s.w {
            init() {
                this.id = this.args.id
            }
            reset() {
                this.destroyed = !1
            }
            constructor(...e) {
                super(...e),
                this.destroyed = !1
            }
        }
    },
    28076: function(e, t, i) {
        i.d(t, {
            J: function() {
                return n
            }
        });
        var s = i(90283);
        class n extends s.w {
        }
    },
    56459: function(e, t, i) {
        i.d(t, {
            m: function() {
                return n
            }
        });
        var s = i(90283);
        class n extends s.w {
        }
    },
    79118: function(e, t, i) {
        i.d(t, {
            H: function() {
                return a
            }
        });
        var s = i(96995);
        class n extends s.UY4 {
            addUniforms(e) {
                e.vertexShader = e.vertexShader.replace("void main() {", "\n      attribute float pSize;\n      uniform mat4 matrixWorldInverse;\n      void main() {\n    ")
            }
            replacePointSize(e) {
                e.vertexShader = e.vertexShader.replace("gl_PointSize = size;", "\n      gl_PointSize = pSize * size;\n    ")
            }
            replaceVertexTransform(e) {
                e.vertexShader = e.vertexShader.replace("#include <project_vertex>", "\n      vec4 mvPosition = vec4( transformed, 1.0 );\n      mvPosition = modelViewMatrix * matrixWorldInverse * mvPosition;\n      gl_Position = projectionMatrix * mvPosition;\n    ")
            }
            constructor(e) {
                super(e),
                this.matrixWorldInverse = new s.yGw,
                this.onBeforeCompile = e=>{
                    e.uniforms.matrixWorldInverse = {
                        value: this.matrixWorldInverse
                    },
                    this.addUniforms(e),
                    this.replacePointSize(e),
                    this.replaceVertexTransform(e)
                }
            }
        }
        var o = i(94573);
        class r extends o.D {
            init() {
                let e = this.args.origin
                  , t = this.args.direction
                  , i = this.args.speed
                  , s = this.args.emissionDelay
                  , o = void 0 === this.args.depthWrite || this.args.depthWrite
                  , r = this.args.color || 16777215;
                e && this.origin.copy(e),
                t && this.direction.copy(t),
                void 0 !== i && (this.speed = i),
                void 0 !== s && (this.emissionDelay = s);
                let a = this.args.map;
                a && (this.args.material = new n({
                    map: a,
                    transparent: !0,
                    color: r,
                    depthWrite: o
                })),
                super.init(),
                this.points && (this.points.frustumCulled = !1);
                for (let l = 0; l < this.count; l += 1)
                    this.setIndex(l, this.count - 1 - l);
                this.invalidateIndices()
            }
            fixedUpdate(e, t) {
                this.updateMaterial(),
                this.updateOrigin(),
                this.emitNewParticles(e.elapsed, t),
                this.animateParticles(e.fixedDelta),
                this.invalidatePositions(),
                this.invalidateSizes()
            }
            getNewParticlePosition() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new s.Pa4;
                return e.copy(this.origin)
            }
            getNewParticleSize() {
                return 1
            }
            updateMaterial() {
                var e, t;
                let {matrixWorld: i} = this.entity.transform.getObject3D()
                  , s = null === (e = this.points) || void 0 === e ? void 0 : e.material;
                null == s || null === (t = s.matrixWorldInverse) || void 0 === t || t.copy(i).invert()
            }
            updateOrigin() {
                let {matrixWorld: e} = this.entity.transform.getObject3D();
                this.origin.setFromMatrixPosition(e)
            }
            getNewParticleCount(e, t) {
                let i = e - this.lastEmissionTime
                  , s = i > this.emissionDelay;
                if (s) {
                    let n = Math.round(i / this.emissionDelay);
                    return this.lastEmissionTime = e,
                    n
                }
                return 0
            }
            animateParticle(e, t) {
                this.getPosition(e, this.tmpVec3),
                this.tmpVec3.addScaledVector(this.worldDirection, this.speed * t);
                let {x: i, y: s, z: n} = this.tmpVec3;
                this.setPosition(e, i, s, n)
            }
            emitNewParticles(e, t) {
                let i = this.getNewParticleCount(e, t);
                for (let s = 0; s < i; s += 1) {
                    this.getNewParticlePosition(this.newParticlePosition);
                    let {x: n, y: o, z: r} = this.newParticlePosition;
                    this.setPosition(this.nextIndex, n, o, r),
                    this.setSize(this.nextIndex, this.getNewParticleSize()),
                    this.nextIndex += 1,
                    this.nextIndex === this.count && (this.nextIndex = 0),
                    this.cycleIndices()
                }
                this.invalidateIndices()
            }
            animateParticles(e) {
                this.worldDirection.copy(this.direction).transformDirection(this.entity.transform.getObject3D().matrixWorld);
                for (let t = 0; t < this.count; t += 1)
                    this.animateParticle(t, e)
            }
            constructor(...e) {
                super(...e),
                this.origin = new s.Pa4(0,0,0),
                this.direction = new s.Pa4(0,1,0),
                this.worldDirection = new s.Pa4,
                this.newParticlePosition = new s.Pa4,
                this.emissionDelay = .002,
                this.speed = 1,
                this.lastEmissionTime = 0,
                this.nextIndex = 0,
                this.tmpVec3 = new s.Pa4
            }
        }
        class a extends r {
            init() {
                this.args.count = 200,
                this.args.size = .3,
                this.args.emissionDelay = .005,
                this.args.direction = new s.Pa4(0,0,-1),
                this.args.depthWrite = !1,
                super.init();
                for (let e = 0; e < this.count; e += 1)
                    this.setSize(e, 0)
            }
            getNewParticlePosition(e) {
                let {z: t} = this.origin;
                this.tmpVector2.set(0, s.M8C.mapLinear(Math.random(), 0, 1, -.15, .15)),
                this.tmpVector2.rotateAround(this.rotationCenter, this.rotationAngle);
                let {x: i, y: n} = this.tmpVector2;
                return i += this.origin.x,
                n += this.origin.y,
                e.set(i, n, t)
            }
            getNewParticleSize() {
                return Math.random()
            }
            getNewParticleCount(e, t) {
                let i = t.fixedUpdateElapsedTime - this.lastEmissionTime
                  , s = i > this.emissionDelay && t.speed > 0;
                if (s) {
                    let n = Math.round(i / this.emissionDelay);
                    return this.lastEmissionTime = t.fixedUpdateElapsedTime,
                    n
                }
                return 0
            }
            animateParticle(e, t) {
                var i;
                this.getPosition(e, this.tmpVector3);
                let s = null === (i = this.getSizeAttribute()) || void 0 === i ? void 0 : i.array
                  , n = s[e];
                this.tmpVector3.addScaledVector(this.worldDirection, this.speed * t),
                this.setSize(e, Math.max(n - .025, 0));
                let {x: o, y: r, z: a} = this.tmpVector3;
                this.setPosition(e, o, r, a)
            }
            fixedUpdate(e, t) {
                super.fixedUpdate(e, t),
                this.speed = t.speed / 5,
                this.rotationAngle -= 16 * e.delta
            }
            constructor(...e) {
                super(...e),
                this.tmpVector3 = new s.Pa4,
                this.tmpVector2 = new s.FM8,
                this.rotationCenter = new s.FM8,
                this.rotationAngle = 0
            }
        }
    },
    86529: function(e, t, i) {
        i.d(t, {
            S: function() {
                return r
            }
        });
        var s = i(90283)
          , n = i(96995);
        class o extends n.jyz {
            constructor(e) {
                let {color: t, screenWidth: i, screenHeight: s, outlineWidth: o, attenuationDistance: r=150, transparent: a=!1} = e
                  , l = {
                    tint: {
                        value: new n.Ilk(t)
                    },
                    outlineWidth: {
                        value: o
                    },
                    attenuationDistance: {
                        value: r
                    },
                    screenResolution: {
                        value: new n.FM8(i,s)
                    }
                };
                super({
                    uniforms: n.rDY.merge([l, n.rBU.fog]),
                    vertexShader: "\n        uniform float outlineWidth;\n        uniform float attenuationDistance;\n        uniform vec2 screenResolution;\n\n        #ifdef USE_DISCARD\n          varying float vDiscard;\n        #endif\n\n        #include <fog_pars_vertex>\n\n        #define saturate(a) clamp(a, 0.0, 1.0);\n\n        float remap01(float value, float inMin, float inMax) {\n          return (value - inMin) / (inMax - inMin);\n        }\n\n        void main() {\n          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n\n          // Transform vertex data into clip space\n          vec4 clipPos = projectionMatrix * mvPosition;\n          vec4 clipNormal = projectionMatrix * modelViewMatrix * vec4(normal, 0.0);\n\n          // Outline width is reduced as it gets away from the camera\n          float attenuation = 1.0 - saturate(remap01(-mvPosition.z, 0.0, 150.0));\n          float width = outlineWidth * attenuation * 2.0;\n\n          // Offset vertices along clip-space normal to create outline effect\n          clipPos.xy += normalize(clipNormal.xy) / screenResolution.xy * width * clipPos.w;\n\n          gl_Position = clipPos;\n\n          #ifdef USE_DISCARD\n            // Transparent faces are stored with uv.x == 1\n            vDiscard = step(0.5, uv.x);\n          #endif\n\n          #include <fog_vertex>\n        }\n      ",
                    fragmentShader: "\n        uniform vec3 tint;\n\n        #ifdef USE_DISCARD\n          varying float vDiscard;\n        #endif\n\n        #include <fog_pars_fragment>\n\n        void main() {\n          #ifdef USE_DISCARD\n            if (vDiscard > 0.5) discard;\n          #endif\n\n          gl_FragColor = vec4(tint, 1.0);\n\n          #include <fog_fragment>\n        }\n      "
                }),
                this.side = n._Li,
                this.fog = !0,
                a && (this.defines.USE_DISCARD = 1)
            }
        }
        class r extends s.w {
            init() {
                let {mesh: e, outlineWidth: t=1, color: i=0, transparent: s=!1} = this.args;
                if (e) {
                    let n = e.clone()
                      , r = new o({
                        color: i,
                        outlineWidth: t,
                        screenWidth: window.innerWidth,
                        screenHeight: window.innerHeight,
                        transparent: s
                    });
                    n.material = r,
                    this.entity.transform.getObject3D().add(n),
                    this.mesh = n
                }
            }
            update() {}
        }
    },
    6268: function(e, t, i) {
        i.d(t, {
            g: function() {
                return a
            }
        });
        var s = i(92839)
          , n = i(90283)
          , o = i(93944)
          , r = i(10469);
        class a extends n.w {
            init() {
                let e = this.entity.getComponent(r.H);
                if (e) {
                    var t;
                    this.material = null === (t = e.mesh) || void 0 === t ? void 0 : t.material
                }
                this.tween = new o.k(this.tweenValues).to({
                    progress: 1
                }, 2e3).onUpdate(()=>{
                    var e;
                    let t = s.oY.Quartic.Out(this.tweenValues.progress);
                    null === (e = this.material) || void 0 === e || e.update(t)
                }
                )
            }
            animate(e, t) {
                var i, s;
                null === (i = this.material) || void 0 === i || i.uniforms.tint.value.setHex(t),
                this.entity.transform.rotation.z = Math.random() * Math.PI * 2,
                this.tweenValues.progress = 0,
                null === (s = this.tween) || void 0 === s || s.stop().start(1e3 * e)
            }
            constructor(...e) {
                super(...e),
                this.tweenValues = {
                    progress: 0
                }
            }
        }
    },
    73008: function(e, t, i) {
        i.d(t, {
            b: function() {
                return a
            }
        });
        var s = i(96995)
          , n = i(93944)
          , o = i(55286)
          , r = i(90283);
        class a extends r.w {
            reset() {
                var e;
                null === (e = this.tween) || void 0 === e || e.stop()
            }
            applyImpact(e) {
                var t;
                let i = e.playerPosition
                  , s = (0,
                o.Mu)(e, this.entity)
                  , r = (0,
                o.li)(e, this.entity)
                  , a = e.fixedUpdateElapsedTime
                  , {position: l, rotation: h} = this.entity.transform;
                this.pushDirection.subVectors(l, i).normalize(),
                this.pushDirection.z = -4,
                this.pushDirection.normalize(),
                null === (t = this.tween) || void 0 === t || t.stop(),
                this.tween = new n.k({
                    progress: 0
                }).to({
                    progress: 1
                }, 1e3).onUpdate(()=>{
                    l.addScaledVector(this.pushDirection, s),
                    h.x += this.rotationOffset.x * r,
                    h.y += this.rotationOffset.y * r,
                    h.z += this.rotationOffset.z * r
                }
                ).start(1e3 * a)
            }
            constructor(...e) {
                super(...e),
                this.pushDirection = new s.Pa4,
                this.rotationOffset = new s.Pa4(1,1,1)
            }
        }
    },
    10469: function(e, t, i) {
        i.d(t, {
            H: function() {
                return n
            }
        });
        var s = i(60462);
        class n extends s.M {
            init() {
                this.mesh = this.args.mesh,
                this.setObject3D(this.mesh)
            }
        }
    },
    94573: function(e, t, i) {
        i.d(t, {
            D: function() {
                return r
            }
        });
        var s = i(96995);
        class n extends s.UY4 {
            addUniforms(e) {
                e.vertexShader = e.vertexShader.replace("void main() {", "\n      attribute float pSize;\n      void main() {\n    ")
            }
            replacePointSize(e) {
                e.vertexShader = e.vertexShader.replace("gl_PointSize = size;", "\n      gl_PointSize = pSize * size;\n    ")
            }
            constructor(e) {
                super(e),
                this.onBeforeCompile = e=>{
                    this.addUniforms(e),
                    this.replacePointSize(e)
                }
            }
        }
        var o = i(60462);
        class r extends o.M {
            get count() {
                var e;
                let t = null === (e = this.getPositionAttribute()) || void 0 === e ? void 0 : e.array.length;
                return void 0 !== t ? t / 3 : 0
            }
            init() {
                let e = this.args.count
                  , t = this.args.map
                  , i = this.args.color
                  , o = this.args.size
                  , r = this.args.material || new n({
                    transparent: !0
                });
                r instanceof s.UY4 && (r.map = t,
                void 0 !== i && (r.color = new s.Ilk(i)),
                void 0 !== o && (r.size = o)),
                this.material = r;
                let a = new s.u9r
                  , l = []
                  , h = []
                  , c = [];
                for (let d = 0; d < e; d += 1)
                    l.push(0, 0, 0),
                    h.push(d),
                    c.push(1);
                a.setAttribute("position", new s.a$l(l,3)),
                a.setAttribute("pSize", new s.a$l(c,1)),
                a.setIndex(h),
                this.points = new s.woe(a,this.material),
                this.setObject3D(this.points)
            }
            getPosition(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new s.Pa4
                  , i = this.getPositionAttribute();
                return t.setX(null == i ? void 0 : i.getX(e)),
                t.setY(null == i ? void 0 : i.getY(e)),
                t.setZ(null == i ? void 0 : i.getZ(e)),
                t
            }
            setPosition(e, t, i, s) {
                let n = this.getPositionAttribute();
                return null == n ? void 0 : n.setXYZ(e, t, i, s)
            }
            setSize(e, t) {
                let i = this.getSizeAttribute()
                  , s = null == i ? void 0 : i.array;
                i && (s[e] = t)
            }
            setIndex(e, t) {
                let i = this.getIndexAttribute();
                if (i) {
                    let s = i.array;
                    s[e] = t
                }
            }
            invalidatePositions() {
                let e = this.getPositionAttribute();
                e && (e.needsUpdate = !0)
            }
            invalidateSizes() {
                let e = this.getSizeAttribute();
                e && (e.needsUpdate = !0)
            }
            invalidateIndices() {
                let e = this.getIndexAttribute();
                e && (e.needsUpdate = !0)
            }
            sortPoints() {
                var e;
                let t = null === (e = this.getPositionAttribute()) || void 0 === e ? void 0 : e.array
                  , i = new s.Pa4
                  , n = [];
                if (t) {
                    for (let o = 0; o < this.count; o += 1)
                        i.fromArray(t, 3 * o),
                        n.push([i.z, o]);
                    n.sort(a);
                    for (let r = 0; r < this.count; r += 1)
                        this.setIndex(r, n[r][1])
                }
            }
            cycleIndices() {
                let e = this.getIndexAttribute();
                if (e) {
                    let t = e.array
                      , {length: i} = t
                      , s = t[i - 1];
                    for (let n = i - 1; n > 0; n -= 1)
                        t[n] = t[n - 1];
                    t[0] = s
                }
            }
            getIndexAttribute() {
                var e;
                return null === (e = this.points) || void 0 === e ? void 0 : e.geometry.index
            }
            getPositionAttribute() {
                var e;
                return null === (e = this.points) || void 0 === e ? void 0 : e.geometry.attributes.position
            }
            getSizeAttribute() {
                var e;
                return null === (e = this.points) || void 0 === e ? void 0 : e.geometry.attributes.pSize
            }
        }
        function a(e, t) {
            return t[0] - e[0]
        }
    },
    60462: function(e, t, i) {
        i.d(t, {
            M: function() {
                return n
            }
        });
        var s = i(90283);
        class n extends s.w {
            init() {
                let e = this.args.object3D;
                this.setObject3D(e)
            }
            setObject3D(e) {
                var t;
                (null === (t = this.object3D) || void 0 === t ? void 0 : t.parent) && this.object3D.parent.remove(this.object3D),
                this.object3D = e,
                this.entity.transform.getObject3D().add(this.object3D)
            }
        }
    },
    3005: function(e, t, i) {
        i.d(t, {
            DD: function() {
                return c
            },
            ES: function() {
                return r
            },
            P2: function() {
                return n
            },
            QB: function() {
                return o
            },
            QH: function() {
                return m
            },
            RE: function() {
                return a
            },
            Xf: function() {
                return d
            },
            YL: function() {
                return l
            },
            aL: function() {
                return v
            },
            dz: function() {
                return p
            },
            iG: function() {
                return s
            },
            ox: function() {
                return y
            },
            tR: function() {
                return u
            },
            uL: function() {
                return f
            },
            yf: function() {
                return h
            },
            yg: function() {
                return g
            }
        });
        let s = 3
          , n = 40
          , o = 40
          , r = .15
          , a = 5
          , l = 50
          , h = 0
          , c = .5
          , d = 40
          , p = 0
          , u = .25
          , m = 0
          , f = .75
          , g = .5
          , v = 1
          , y = .7
    },
    18297: function(e, t, i) {
        i.d(t, {
            IJ: function() {
                return r
            },
            KW: function() {
                return a
            },
            MF: function() {
                return m
            },
            P: function() {
                return p
            },
            Y_: function() {
                return u
            },
            a4: function() {
                return o
            },
            u9: function() {
                return d
            },
            w2: function() {
                return f
            },
            yd: function() {
                return c
            }
        });
        var s, n = i(24423);
        n.zk.BAYC,
        n.zk.MAYC;
        let o = {
            disk: n.uq.Common,
            hex: n.uq.Common,
            lobe: n.uq.Common,
            alpha: n.uq.Common,
            o2: n.uq.Common,
            manifold: n.uq.Common,
            "anti-matter": n.uq.Common,
            matter: n.uq.Common,
            pin: n.uq.Common,
            tater: n.uq.Common,
            valve: n.uq.Uncommon,
            flex: n.uq.Uncommon,
            arc: n.uq.Uncommon,
            squeezer: n.uq.Uncommon,
            jaws: n.uq.Uncommon,
            hive: n.uq.Uncommon,
            fusion: n.uq.Rare,
            "spore-drive": n.uq.Rare,
            reflex: n.uq.Rare,
            fuse: n.uq.Rare,
            egg: n.uq.Epic,
            donut: n.uq.Epic,
            knobs: n.uq.Epic,
            wiggler: n.uq.Legendary,
            spark: n.uq.Legendary
        }
          , r = {
            disk: "collectible_21",
            hex: "collectible_4",
            lobe: "collectible_9",
            alpha: "collectible_14",
            o2: "collectible_16",
            manifold: "collectible_25",
            "anti-matter": "collectible_19",
            matter: "collectible_15",
            pin: "collectible_23",
            tater: "collectible_13",
            valve: "collectible_24",
            flex: "collectible_1",
            arc: "collectible_22",
            squeezer: "collectible_2",
            jaws: "collectible_6",
            hive: "collectible_5",
            fusion: "collectible_17",
            "spore-drive": "collectible_12",
            reflex: "collectible_18",
            fuse: "collectible_3",
            egg: "collectible_11",
            donut: "collectible_7",
            knobs: "collectible_8",
            wiggler: "collectible_10",
            spark: "collectible_20"
        }
          , a = new Map;
        for (let l of Object.keys(o)) {
            let h = o[l];
            a.has(h) || a.set(h, []),
            null === (s = a.get(h)) || void 0 === s || s.push(l)
        }
        let c = new Map
          , d = new Map([[n.uq.Common, {
            color: 13227985
        }], [n.uq.Uncommon, {
            color: 1891723
        }], [n.uq.Rare, {
            color: 5945855
        }], [n.uq.Epic, {
            color: 11828223
        }], [n.uq.Legendary, {
            color: 16628798
        }]])
          , p = ["grid", "grid2", "propeller", "pipe", "pipe2", "pipe3", "pipe4", "pipe5"]
          , u = ["ball", "toiletpaper"]
          , m = ["empty", "empty", "empty", "empty", "gate", "empty", "empty", "empty", "empty", "empty", "empty", "barricade", "empty", "empty", "empty", "empty", "empty", "empty", "collectible", "empty", "empty", "empty", "empty", "empty", "empty"]
          , f = {
            barrel: 2,
            bin: 1,
            car: 5,
            christmastree: 5,
            cone: 1,
            cow: 4,
            desk: 2,
            firehydrant: 1,
            freezer: 3,
            lid: 1,
            locker: 3,
            metalsheet: 1,
            neon: 1,
            phonebooth: 4,
            radiator: 1,
            safe: 2,
            speaker: 1,
            trafficsign: 1,
            trafficsign2: 1,
            trafficsign3: 1,
            trafficsign4: 1,
            trafficsign5: 1,
            trash: 1,
            tv: 2,
            wc: 2,
            wheel: 1,
            wheelbarrow: 3,
            wheelchair: 2,
            window: 1,
            wood: 2,
            wood2: 2,
            wood3: 2,
            wood4: 2,
            applecore: 1,
            ball: 1,
            bananapeel: 1,
            beercan: 1,
            bones: 1,
            bottle: 1,
            bottle2: 1,
            cardboard: 1,
            cardboard2: 1,
            cigarette: 1,
            cigarette2: 1,
            cigarette3: 1,
            fishcarcass: 1,
            hotdog: 1,
            magazine: 1,
            meat: 1,
            nail: 1,
            nail2: 1,
            pizza: 1,
            pizzabox: 1,
            plasticduck: 1,
            sandwich: 1,
            sausage: 1,
            shoes: 1,
            skateboard: 1,
            soda: 1,
            spraypaint: 1,
            straw: 1,
            syringe: 1,
            tincan: 1,
            tincan2: 1,
            toiletpaper: 1,
            toiletplunger: 1,
            wrench: 1
        }
    },
    84045: function(e, t, i) {
        i.d(t, {
            k: function() {
                return o
            }
        });
        var s = i(34406);
        let n = "true" === s.env.NEXT_PUBLIC_DEBUG
          , o = n ? new class {
            log(e) {
                console.log(e)
            }
            logDebug(e) {
                console.debug(e)
            }
            logError(e) {
                console.error(e)
            }
            count(e) {
                console.count(e)
            }
        }
        : new class {
            log(e) {}
            logDebug(e) {}
            logError(e) {}
            count(e) {}
        }
    },
    22183: function(e, t, i) {
        i.d(t, {
            M: function() {
                return n
            }
        });
        var s = i(93545);
        class n {
            add(e) {
                return (0,
                s.isFunction)(e) && this.slots.push(e),
                this
            }
            once(e) {
                return (0,
                s.isFunction)(e) && this.onces.push(e),
                this
            }
            remove(e) {
                return this.slots = this.slots.filter(t=>t !== e),
                this.onces = this.onces.filter(t=>t !== e),
                this
            }
            emit(e) {
                this.notify(this.slots, e),
                this.notify(this.onces, e),
                this.onces = []
            }
            notify(e, t) {
                for (let i = 0; i < e.length; i += 1) {
                    let s = e[i];
                    s.call(s, void 0 !== t ? t : null)
                }
            }
            constructor() {
                this.slots = [],
                this.onces = []
            }
        }
    },
    93944: function(e, t, i) {
        i.d(t, {
            k: function() {
                return n
            },
            v: function() {
                return o
            }
        });
        var s = i(92839);
        class n extends s.kX {
            start(e) {
                let t = this._object
                  , i = this._valuesStart;
                for (let s of Object.keys(t))
                    i[s] = t[s];
                return super.start(e)
            }
        }
        class o {
            to(e, t) {
                let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s.oY.Linear.None;
                return this.steps.push({
                    tween: new n(this.props),
                    properties: e,
                    duration: t,
                    easing: i
                }),
                this
            }
            start() {
                let e = t=>{
                    let i = this.steps[t];
                    i ? (i.tween.to(i.properties, 1e3 * i.duration).easing(i.easing),
                    i.tween.start(1e3 * this.timeFunc()).onUpdate(()=>{
                        this.onUpdateCallback && this.onUpdateCallback()
                    }
                    ).onComplete(()=>{
                        e(t + 1)
                    }
                    )) : this.onCompleteCallback && this.onCompleteCallback()
                }
                ;
                return e(0),
                this
            }
            reset() {
                for (let e of this.steps)
                    e.tween.stop();
                return this
            }
            onUpdate(e) {
                return this.onUpdateCallback = e,
                this
            }
            onComplete(e) {
                return this.onCompleteCallback = e,
                this
            }
            constructor(e, t) {
                this.steps = [],
                this.props = e,
                this.timeFunc = t
            }
        }
    },
    90283: function(e, t, i) {
        i.d(t, {
            w: function() {
                return s
            }
        });
        class s {
            init() {}
            dispose() {}
            reset() {}
            onPauseUpdateLoop() {}
            onResumeUpdateLoop() {}
            update(e) {
                for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
                    i[s - 1] = arguments[s]
            }
            fixedUpdate(e) {
                for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
                    i[s - 1] = arguments[s]
            }
            constructor(e, t) {
                this.enabled = !0,
                this.entity = e,
                this.args = t || {}
            }
        }
    },
    23206: function(e, t, i) {
        i.d(t, {
            J: function() {
                return a
            }
        });
        var s = i(96995)
          , n = i(22183)
          , o = i(30823);
        let r = 0;
        class a {
            get transform() {
                return this.getComponent(o.w)
            }
            dispose() {
                for (let e of this.components)
                    e.dispose(),
                    this.onRemoveComponent.emit(e);
                this.components.length = 0
            }
            reset() {
                return this.forEachComponent(e=>{
                    e.enabled = !0,
                    e.reset(),
                    e.init()
                }
                ),
                this
            }
            addComponent(e, t) {
                let i = new e(this,t);
                return i.init(),
                this.components.push(i),
                this.onAddComponent.emit(i),
                i
            }
            removeComponent(e) {
                let t = this.components.indexOf(e);
                if (t > -1) {
                    let i = this.components[t];
                    this.components.splice(t, 1),
                    this.onRemoveComponent.emit(i),
                    i.dispose()
                }
            }
            hasComponent(e) {
                return !!this.getComponent(e)
            }
            getComponent(e) {
                return this.components.find(t=>t instanceof e)
            }
            getComponentsOfType(e) {
                return this.components.filter(t=>t instanceof e)
            }
            forEachComponent(e) {
                for (let t of this.components)
                    e(t)
            }
            onPauseUpdateLoop() {
                this.forEachComponent(e=>e.onPauseUpdateLoop())
            }
            onResumeUpdateLoop() {
                this.forEachComponent(e=>e.onResumeUpdateLoop())
            }
            add(e) {
                if (!this.transform)
                    throw Error("This entity has no transform component.");
                if (!e.transform)
                    throw Error("Child entity has no transform component.");
                this.transform.add(e.transform)
            }
            remove(e) {
                if (!this.transform)
                    throw Error("This entity has no transform component.");
                if (!e.transform)
                    throw Error("Child entity has no transform component.");
                this.transform.remove(e.transform)
            }
            constructor(e="") {
                this.onAddComponent = new n.M,
                this.onRemoveComponent = new n.M,
                this.components = [],
                this.uuid = s.M8C.generateUUID(),
                this.index = r,
                this.name = e,
                r += 1
            }
        }
    },
    95905: function(e, t, i) {
        i.d(t, {
            s: function() {
                return r
            },
            t: function() {
                return o
            }
        });
        var s = i(38184);
        let n = (0,
        s.Z)();
        function o() {
            return !!n.mobile
        }
        function r(e) {
            return Math.floor(1e3 * e) / 1e3
        }
    },
    41446: function(e, t, i) {
        i.d(t, {
            h: function() {
                return s
            }
        });
        class s {
        }
    },
    60069: function(e, t, i) {
        i.d(t, {
            Y: function() {
                return s
            }
        });
        class s extends Map {
            dispose() {
                this.clear()
            }
        }
    },
    26460: function(e, t, i) {
        i.d(t, {
            i: function() {
                return n
            }
        });
        var s = i(96995);
        class n {
            copy(e) {
                return this.scene = e.scene,
                this.camera = e.camera,
                this
            }
            static createDefaultRenderContext() {
                return new n(new s.xsS,new s.cPb)
            }
            constructor(e, t) {
                this.needsRender = !0,
                this.scene = e,
                this.camera = t
            }
        }
    },
    79404: function(e, t, i) {
        i.d(t, {
            T: function() {
                return l
            }
        });
        var s = i(96995)
          , n = i(22183)
          , o = i(26460)
          , r = i(41446);
        class a extends r.h {
            render(e) {
                let t = e.getRenderContext()
                  , i = e.getWebGLRenderer();
                i.render(t.scene, t.camera)
            }
        }
        class l {
            dispose() {
                var e;
                let t = this.getCanvas();
                null == t || null === (e = t.parentNode) || void 0 === e || e.removeChild(t),
                this.webglRenderer.dispose(),
                window.removeEventListener("resize", this.handleResize)
            }
            getSize() {
                var e;
                return null === (e = this.webglRenderer) || void 0 === e || e.getSize(this._size),
                [this._size.x, this._size.y]
            }
            setSize(e, t) {
                var i;
                null === (i = this.webglRenderer) || void 0 === i || i.setSize(e, t)
            }
            getCanvas() {
                return this.webglRenderer.domElement
            }
            getRenderContext() {
                return this.context
            }
            getWebGLRenderer() {
                return this.webglRenderer
            }
            setRenderContext(e) {
                this.context = e
            }
            setContainer(e) {
                this.container = e,
                this.container.append(this.getCanvas()),
                this.handleResize()
            }
            getContainer() {
                return this.container
            }
            render() {
                this.pipeline.render(this),
                this.onRender.emit()
            }
            constructor(e={}) {
                this.onResize = new n.M,
                this.onRender = new n.M,
                this._size = new s.FM8,
                this.handleResize = ()=>{
                    let e = this.container.clientWidth
                      , t = this.container.clientHeight;
                    this.setSize(e, t),
                    this.onResize.emit([e, t])
                }
                ;
                let {container: t=document.body, context: i=o.i.createDefaultRenderContext(), pipeline: r=null, webglRendererOptions: l={}} = e;
                this.container = t,
                this.context = i,
                this.pipeline = r || new a,
                this.webglRenderer = function(e, t) {
                    let {canvas: i=null, antialias: n=!0, alpha: o=!1, stencil: r=!1, autoClear: a=!0, maxPixelRatio: l=window.devicePixelRatio, powerPreference: h="high-performance", checkShaderErrors: c=!0, preserveDrawingBuffer: d=!1} = t
                      , p = new s.CP7({
                        canvas: i || document.createElement("canvas"),
                        antialias: n,
                        alpha: o,
                        stencil: r,
                        powerPreference: h,
                        preserveDrawingBuffer: d
                    });
                    return p.autoClear = a,
                    p.setPixelRatio(Math.min(l, window.devicePixelRatio)),
                    p.debug.checkShaderErrors = c,
                    e && (e.append(p.domElement),
                    p.domElement.style.display = "block"),
                    p
                }(t, l),
                window.addEventListener("resize", this.handleResize),
                this.handleResize()
            }
        }
    },
    24423: function(e, t, i) {
        var s, n, o, r, a, l, h, c;
        i.d(t, {
            GF: function() {
                return s
            },
            kr: function() {
                return n
            },
            uq: function() {
                return r
            },
            zk: function() {
                return o
            }
        }),
        (a = s || (s = {})).Idle = "idle",
        a.Tutorial = "tutorial",
        a.Game = "game",
        a.Ended = "ended",
        (l = n || (n = {})).QuickDashRefill = "refill",
        l.CollectiblesBoost = "collectible",
        l.ScoreMultiplier = "multiplier",
        (h = o || (o = {})).BAYC = "bayc",
        h.MAYC = "mayc",
        (c = r || (r = {})).Common = "common",
        c.Uncommon = "uncommon",
        c.Rare = "rare",
        c.Epic = "epic",
        c.Legendary = "legendary"
    },
    28530: function(e, t, i) {
        i.d(t, {
            Ch: function() {
                return M
            },
            OJ: function() {
                return ee
            },
            Sd: function() {
                return em
            },
            Ed: function() {
                return ef
            },
            kg: function() {
                return h.k
            }
        });
        var s, n, o = i(22183), r = i(95905), a = i(24423), l = i(6288), h = i(84045), c = i(78910), d = i(7544);
        class p {
            start() {
                this.startTime = m(),
                this.oldTime = this.startTime,
                this.elapsedTime = 0,
                this.running = !0
            }
            stop() {
                this.getElapsedTime(),
                this.running = !1
            }
            pause() {
                this.stop()
            }
            resume() {
                this.elapsedTime > 0 && !this.running && (this.running = !0,
                this.oldTime = m())
            }
            reset() {
                this.running = !1,
                this.startTime = 0,
                this.oldTime = 0,
                this.elapsedTime = 0
            }
            getElapsedTime() {
                return this.getDelta(),
                this.elapsedTime
            }
            getDelta() {
                let e = 0;
                if (this.running) {
                    let t = m();
                    e = (t - this.oldTime) / 1e3,
                    this.oldTime = t,
                    this.elapsedTime += e
                }
                return e
            }
            constructor() {
                this.running = !1,
                this.startTime = 0,
                this.oldTime = 0,
                this.elapsedTime = 0
            }
        }
        class u {
            dispose() {
                this.clock.reset()
            }
            update() {
                this.delta = this.clock.getDelta(),
                this.elapsed = this.clock.getElapsedTime()
            }
            pause() {
                this.clock.running && this.clock.pause()
            }
            resume() {
                this.clock.running || this.clock.resume()
            }
            constructor() {
                this.delta = 0,
                this.fixedDelta = 1 / 60,
                this.elapsed = 0,
                this.clock = new p,
                this.clock.start()
            }
        }
        function m() {
            return ("undefined" == typeof performance ? Date : performance).now()
        }
        class f {
            dispose() {
                this.pause()
            }
            start() {
                this.started || (this.handleRAF(),
                this.started = !0,
                this.onPause.emit())
            }
            pause() {
                this.paused || (this.paused = !0,
                this.time.pause(),
                this.onPause.emit())
            }
            resume() {
                this.paused && (this.paused = !1,
                this.time.resume(),
                this.onResume.emit(),
                this.started && this.handleRAF())
            }
            isPaused() {
                return this.paused
            }
            constructor(e) {
                this.onStart = new o.M,
                this.onUpdate = new o.M,
                this.onFixedUpdate = new o.M,
                this.onPause = new o.M,
                this.onResume = new o.M,
                this.started = !1,
                this.paused = !1,
                this.lastFixedUpdateTime = 0,
                this.handleRAF = ()=>{
                    if (!this.paused) {
                        this.time.update(),
                        this.onUpdate.emit();
                        let e = this.time.elapsed - this.lastFixedUpdateTime
                          , t = Math.floor(e / this.time.fixedDelta);
                        for (let i = 0; i < t; i += 1)
                            this.onFixedUpdate.emit(),
                            this.lastFixedUpdateTime += this.time.fixedDelta;
                        window.requestAnimationFrame(this.handleRAF)
                    }
                }
                ,
                this.time = e
            }
        }
        var g = i(82115)
          , v = i(80899)
          , y = i(5274)
          , x = i(84681)
          , b = i(21043)
          , S = i(45567)
          , w = i(3868)
          , _ = i(77239)
          , T = i(50710)
          , C = i(79404)
          , P = i(80545)
          , E = i(19431);
        class M extends Error {
            constructor(...e) {
                super(...e),
                this.message = "Game config is invalid."
            }
        }
        var R = i(21965)
          , A = i(49081)
          , D = i(3005)
          , k = JSON.parse('{"A":[0,9795],"B":[9795,9796],"C":[19591,7347],"D":[26938,2449],"E":[29387,2449],"F":[31836,4898],"G":[36734,4898],"H":[41632,4898],"I":[46530,4898],"J":[51428,4898],"K":[56326,19592],"L":[75918,4898],"M":[80816,4898],"N":[85714,4898],"O":[90612,4898],"P":[95510,4898],"Q":[100408,4898],"R":[105306,4898],"S":[110204,4898],"T":[115102,4898],"U":[120000,19592],"V":[139591,14694],"W":[154285,19592]}')
          , O = JSON.parse('["A","B","B","C","D","C","E","F","B","B","F","G","H","G","I","F","B","B","J","K","L","M","L","N","J","O","P","O","Q","R","S","R","T","J","K","L","M","L","N","V","J","O","P","O","Q","R","S","R","T","U","W"]');
        class L {
            dispose() {
                this.howl.stop(),
                this.sequence.length = 0,
                this.howl.unload()
            }
            reset() {
                this.howl.stop(),
                this.currentTrackIndex = 0
            }
            play() {
                this.isPlaying() || this.playTrack(this.sequence[0])
            }
            stop() {
                this.howl.stop()
            }
            isPlaying() {
                return this.howl.playing()
            }
            playTrack(e) {
                this.howl.play(e)
            }
            constructor() {
                this.sequence = [...O],
                this.currentTrackIndex = 0,
                this.handleTrackEnd = ()=>{
                    let e = this.currentTrackIndex;
                    (e += 1) === this.sequence.length && (e = 1),
                    this.playTrack(this.sequence[e]),
                    this.currentTrackIndex = e
                }
                ,
                this.howl = new A.Howl({
                    src: ["/audio/game/music.mp3"],
                    sprite: k,
                    preload: !0,
                    loop: !1,
                    volume: D.aL,
                    onend: this.handleTrackEnd
                })
            }
        }
        var I = JSON.parse('{"collect_common":[0,2500],"collect_epic":[3000,2500],"collect_legendary":[6000,2500],"collect_rare":[9000,2500],"collect_uncommon":[12000,2500],"dash_activate":[15000,5000],"dash_ready":[20000,1500],"hit_bounce":[22000,1000],"hit_game_over":[23000,3500],"hit_wood_destruction":[27000,2000]}');
        class F {
            dispose() {
                this.sfx.unload(),
                this.engine.unload()
            }
            play(e) {
                this.sfx.play(e)
            }
            playEngineLoop() {
                this.engine.playing() || this.engine.play()
            }
            stopEngineLoop() {
                this.engine.stop()
            }
            constructor() {
                this.sfx = new A.Howl({
                    src: ["/audio/game/sounds.mp3"],
                    sprite: I,
                    preload: !0,
                    volume: D.ox
                }),
                this.engine = new A.Howl({
                    src: ["/audio/game/engine-loop.mp3"],
                    preload: !0,
                    loop: !0,
                    volume: 1
                })
            }
        }
        var z = i(18297);
        (s = n || (n = {}))[s.GameStart = 0] = "GameStart",
        s[s.GameOver = 1] = "GameOver",
        s[s.PlayerDeath = 2] = "PlayerDeath",
        s[s.Dash = 3] = "Dash",
        s[s.DashAvailable = 4] = "DashAvailable",
        s[s.ObjectDestruction = 5] = "ObjectDestruction",
        s[s.Deflection = 6] = "Deflection",
        s[s.ItemPickup = 7] = "ItemPickup",
        s[s.TutorialStepSuccess = 8] = "TutorialStepSuccess",
        s[s.TutorialStepFailure = 9] = "TutorialStepFailure";
        class U {
            dispose() {
                this.gameModeSystem && (this.gameModeSystem.onGameStart.remove(this.handleGameStart),
                this.gameModeSystem.onGameOver.remove(this.handleGameOver),
                this.gameModeSystem.onPlayerDeath.remove(this.handlePlayerDeath),
                this.gameModeSystem.onPlayerDestroyObstacle.remove(this.handleDestroyObstacle),
                this.gameModeSystem.onPlayerDeflection.remove(this.handleDeflection),
                this.gameModeSystem.onPickupCollectible.remove(this.handleItemPickup),
                this.gameModeSystem.onCollisionWithObject.remove(this.handleObjectCollision)),
                this.tutorialModeSystem && (this.tutorialModeSystem.onStart.remove(this.handleTutorialStart),
                this.tutorialModeSystem.onStepSuccess.remove(this.handleTutorialStepSuccess),
                this.tutorialModeSystem.onStepFail.remove(this.handleTutorialStepFailure),
                this.tutorialModeSystem.onCollisionWithObject.remove(this.handleObjectCollision),
                this.tutorialModeSystem.onPickupCollectible.remove(this.handleItemPickup),
                this.tutorialModeSystem.onPlayerDestroyObstacle.remove(this.handleDestroyObstacle)),
                this.playerMovementSystem && (this.playerMovementSystem.onDash.remove(this.handlePlayerDash),
                this.playerMovementSystem.onDashAvailabilityChange.remove(this.handleDashAvailable))
            }
            reset(e) {
                this.dispose(),
                this.gameModeSystem = e.getSystemOfType(g.z),
                this.tutorialModeSystem = e.getSystemOfType(T.j),
                this.playerMovementSystem = e.getSystemOfType(x.b),
                this.gameModeSystem.onGameStart.add(this.handleGameStart),
                this.gameModeSystem.onGameOver.add(this.handleGameOver),
                this.gameModeSystem.onPlayerDeath.add(this.handlePlayerDeath),
                this.gameModeSystem.onPlayerDestroyObstacle.add(this.handleDestroyObstacle),
                this.gameModeSystem.onPlayerDeflection.add(this.handleDeflection),
                this.gameModeSystem.onPickupCollectible.add(this.handleItemPickup),
                this.gameModeSystem.onCollisionWithObject.add(this.handleObjectCollision),
                this.tutorialModeSystem.onStart.add(this.handleTutorialStart),
                this.tutorialModeSystem.onStepSuccess.add(this.handleTutorialStepSuccess),
                this.tutorialModeSystem.onStepFail.add(this.handleTutorialStepFailure),
                this.tutorialModeSystem.onCollisionWithObject.add(this.handleObjectCollision),
                this.tutorialModeSystem.onPickupCollectible.add(this.handleItemPickup),
                this.tutorialModeSystem.onPlayerDestroyObstacle.add(this.handleDestroyObstacle),
                this.playerMovementSystem.onDash.add(this.handlePlayerDash),
                this.playerMovementSystem.onDashAvailabilityChange.add(this.handleDashAvailable)
            }
            raiseEvent(e) {
                this.onEvent.emit(e)
            }
            constructor(e) {
                this.onEvent = new o.M,
                this.handleGameStart = ()=>{
                    this.raiseEvent({
                        type: n.GameStart
                    })
                }
                ,
                this.handleGameOver = ()=>{
                    this.raiseEvent({
                        type: n.GameOver
                    })
                }
                ,
                this.handlePlayerDeath = ()=>{
                    this.raiseEvent({
                        type: n.PlayerDeath
                    })
                }
                ,
                this.handleItemPickup = e=>{
                    this.raiseEvent({
                        type: n.ItemPickup,
                        args: [z.a4[e]]
                    })
                }
                ,
                this.handlePlayerDash = ()=>{
                    this.raiseEvent({
                        type: n.Dash
                    })
                }
                ,
                this.handleDashAvailable = e=>{
                    e && this.raiseEvent({
                        type: n.DashAvailable
                    })
                }
                ,
                this.handleObjectCollision = ()=>{}
                ,
                this.handleDestroyObstacle = e=>{
                    this.raiseEvent({
                        type: n.ObjectDestruction,
                        args: [e]
                    })
                }
                ,
                this.handleDeflection = ()=>{
                    this.raiseEvent({
                        type: n.Deflection
                    })
                }
                ,
                this.handleTutorialStart = ()=>{
                    this.raiseEvent({
                        type: n.GameStart
                    })
                }
                ,
                this.handleTutorialStepSuccess = ()=>{
                    this.raiseEvent({
                        type: n.TutorialStepSuccess
                    })
                }
                ,
                this.handleTutorialStepFailure = ()=>{
                    this.raiseEvent({
                        type: n.TutorialStepFailure
                    })
                }
                ,
                this.reset(e)
            }
        }
        class B {
            static applyGameSettings() {
                this.autoSuspend = Howler.autoSuspend,
                this.html5PoolSize = Howler.html5PoolSize,
                this.usingWebAudio = Howler.usingWebAudio,
                Howler.autoSuspend = !1,
                Howler.html5PoolSize = 0,
                Howler.usingWebAudio = !0
            }
            static restorePreviousSettings() {
                Howler.autoSuspend = this.autoSuspend,
                Howler.html5PoolSize = this.html5PoolSize,
                Howler.usingWebAudio = this.usingWebAudio
            }
        }
        class G extends R.d {
            init() {
                this.emitter || (this.emitter = new U(this.context.systems),
                this.emitter.onEvent.add(this.handleEvent),
                B.applyGameSettings())
            }
            dispose() {
                B.restorePreviousSettings(),
                this.music.dispose(),
                this.sounds.dispose(),
                this.emitter.onEvent.remove(this.handleEvent),
                this.emitter.dispose()
            }
            reset(e) {
                return this.context = e,
                this.emitter.reset(this.context.systems),
                this.music.reset(),
                this
            }
            constructor(e) {
                super(e),
                this.music = new L,
                this.sounds = new F,
                this.handleEvent = e=>{
                    let t = e.args || [];
                    switch (e.type) {
                    case n.GameStart:
                        this.music.play(),
                        this.sounds.playEngineLoop();
                        break;
                    case n.GameOver:
                        this.music.stop(),
                        this.sounds.stopEngineLoop();
                        break;
                    case n.TutorialStepFailure:
                    case n.PlayerDeath:
                        this.sounds.play("hit_game_over");
                        break;
                    case n.Dash:
                        this.sounds.play("dash_activate");
                        break;
                    case n.DashAvailable:
                        this.state.dashing || this.sounds.play("dash_ready");
                        break;
                    case n.ItemPickup:
                        let i = t[0];
                        this.sounds.play("collect_".concat(i));
                        break;
                    case n.Deflection:
                        this.sounds.play("hit_bounce");
                        break;
                    case n.ObjectDestruction:
                        let s = t[0];
                        s.startsWith("wood") && this.sounds.play("hit_wood_destruction")
                    }
                }
                ,
                this.state = this.context.state
            }
        }
        class N {
            clear() {
                clearTimeout(this.timeoutFunc)
            }
            constructor(e, t) {
                this.timeoutFunc = setTimeout(e, t)
            }
        }
        var H = i(21434)
          , j = i(60124)
          , V = i(24575)
          , W = i(41446);
        class K extends W.h {
            render(e) {
                let t = e.getRenderContext()
                  , i = e.getWebGLRenderer();
                i.render(t.scene, t.camera)
            }
        }
        var J = i(93545)
          , Y = i(34895);
        class q extends c.g {
            dispose() {
                var e, t;
                null === (e = this.onPlayerDeath) || void 0 === e || e.remove(this.handlePlayerDeath),
                null === (t = this.onTutorialStepFail) || void 0 === t || t.remove(this.handleTutorialStepFail),
                this.clearTimeouts(),
                (0,
                j.h)(),
                super.dispose()
            }
            reset() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.GF.Idle
                  , t = this.context.systems.getSystemOfType(_.K)
                  , i = this.context.systems.getSystemOfType(G);
                this.context.systems.unregisterSystem(t),
                this.context.systems.unregisterSystem(i),
                this.onReset.emit({
                    targetMode: e,
                    renderSystem: t,
                    audioSystem: i
                })
            }
            get onPlayerDeath() {
                return this.gameModeSystem.onPlayerDeath
            }
            get onGameStart() {
                return this.gameModeSystem.onGameStart
            }
            get onGameOver() {
                return this.gameModeSystem.onGameOver
            }
            get onScoreChange() {
                return this.gameModeSystem.onScoreChange
            }
            get onPickupCollectible() {
                return this.gameModeSystem.onPickupCollectible
            }
            get onDashAvailabilityChange() {
                return this.playerMovementSystem.onDashAvailabilityChange
            }
            get onBonusPoints() {
                return this.gameModeSystem.onBonusPoints
            }
            get onTutorialStart() {
                return this.tutorialModeSystem.onStart
            }
            get onTutorialStepBegin() {
                return this.tutorialModeSystem.onStepBegin
            }
            get onTutorialStepFail() {
                return this.tutorialModeSystem.onStepFail
            }
            get onTutorialStepSuccess() {
                return this.tutorialModeSystem.onStepSuccess
            }
            get onTutorialComplete() {
                return this.tutorialModeSystem.onComplete
            }
            setContainer(e) {
                this.renderer.setContainer(e)
            }
            getContainer() {
                this.renderer.getContainer()
            }
            setMode(e) {
                if (this.isTargetModeValid(e))
                    switch (e) {
                    case a.GF.Idle:
                        this.setIdleMode();
                        break;
                    case a.GF.Game:
                        this.setGameMode();
                        break;
                    case a.GF.Tutorial:
                        this.setTutorialMode();
                        break;
                    case a.GF.Ended:
                        this.setEndedMode()
                    }
                else
                    h.k.logError('Setting mode "'.concat(e, '" is forbidden when current mode is "').concat(this.state.mode, '".'))
            }
            isTargetModeValid(e) {
                let t = this.state.mode;
                switch (e) {
                case a.GF.Idle:
                    if (t === a.GF.Game || t === a.GF.Tutorial || t === a.GF.Ended)
                        return !1;
                    break;
                case a.GF.Game:
                    if (!(t === a.GF.Idle || t === a.GF.Tutorial))
                        return !1;
                    break;
                case a.GF.Tutorial:
                    if (t !== a.GF.Idle)
                        return !1;
                    break;
                case a.GF.Ended:
                    if (!(t === a.GF.Game || t === a.GF.Tutorial))
                        return !1
                }
                return !0
            }
            getGameData() {
                var e;
                if (this.state.mode !== a.GF.Ended)
                    throw Error("Cannot return game result because it has not ended yet.");
                let t = null === (e = this.inputRecorderSystem) || void 0 === e ? void 0 : e.getEntries();
                return {
                    config: function(e) {
                        let {seed: t, character: i, buffs: s=[], tier: n, booster: o} = e;
                        return {
                            seed: t,
                            character: i,
                            buffs: [...s],
                            booster: o,
                            tier: n
                        }
                    }(this.config),
                    history: (0,
                    H.z5)(t),
                    score: this.state.score
                }
            }
            initScene(e) {
                let t = new e(this.context)
                  , i = this.context.systems.getSystemOfType(_.K)
                  , s = null == i ? void 0 : i.renderer.getRenderContext();
                t.init(null == i ? void 0 : i.renderer);
                let n = this.context.components.getComponentOfType(E.V);
                return s && n && (s.camera = null == n ? void 0 : n.getInternalCamera()),
                t
            }
            setIdleMode() {
                this.state.mode = a.GF.Idle,
                (0,
                Y.Rj)(this.context)
            }
            setGameMode() {
                this.state.mode = a.GF.Game,
                (0,
                Y.Fv)(this.context)
            }
            setTutorialMode() {
                this.state.mode = a.GF.Tutorial,
                (0,
                Y.cs)(this.context)
            }
            setEndedMode() {
                let e = this.state.mode;
                switch (this.state.mode = a.GF.Ended,
                e) {
                case a.GF.Tutorial:
                    (0,
                    Y.lA)(this.context);
                    break;
                case a.GF.Game:
                    (0,
                    Y.NA)(this.context)
                }
            }
            registerTimeout(e, t) {
                this.timeouts.push(new N(e,t))
            }
            clearTimeouts() {
                for (let e of this.timeouts)
                    e.clear()
            }
            initiateReset(e) {
                this.onBeforeReset.emit(),
                this.registerTimeout(()=>{
                    this.reset(e)
                }
                , 150)
            }
            constructor(e, t, i, s) {
                var n, r, l;
                if (!function(e) {
                    let {seed: t="", character: i="", buffs: s=[]} = e;
                    if (!(0,
                    J.isString)(t) || "" === i || !Object.values(a.zk).includes(i))
                        return !1;
                    for (let n of s)
                        if (!Object.values(a.kr).includes(n))
                            return !1;
                    return !0
                }(t))
                    throw new M;
                let {seed: h=Date.now().toString()} = t
                  , c = new V.D(t)
                  , p = new u
                  , m = new d.I(c,p,i,h)
                  , E = new f(m.time)
                  , {audioSystem: R, renderSystem: A} = s || {};
                super(m, E),
                this.onBeforeReset = new o.M,
                this.onReset = new o.M,
                this.name = "Game",
                this.timeouts = [],
                this.handlePlayerDeath = ()=>{
                    this.setMode(a.GF.Ended)
                }
                ,
                this.handleTutorialStepFail = ()=>{
                    this.setMode(a.GF.Ended),
                    this.registerTimeout(()=>{
                        this.initiateReset(a.GF.Tutorial)
                    }
                    , 1e3)
                }
                ,
                this.config = t,
                this.state = c,
                this.addSystems([new y.E(m), new x.b(m), new b.t(m), new T.j(m), new S.d(m), new w.s(m), new g.z(m), new v.$(m), R || new G(m), A || new _.K(m,{
                    renderer: new C.T({
                        container: e,
                        pipeline: new K,
                        webglRendererOptions: {
                            maxPixelRatio: 1.5
                        }
                    })
                })]),
                A && A.reset(m),
                R && R.reset(m),
                this.playerMovementSystem = this.getSystem(x.b),
                this.gameModeSystem = this.getSystem(g.z),
                this.inputRecorderSystem = this.getSystem(v.$),
                this.tutorialModeSystem = this.getSystem(T.j),
                this.renderer = null === (n = this.getSystem(_.K)) || void 0 === n ? void 0 : n.renderer,
                null === (r = this.onPlayerDeath) || void 0 === r || r.add(this.handlePlayerDeath),
                null === (l = this.onTutorialStepFail) || void 0 === l || l.add(this.handleTutorialStepFail),
                this.init(P.F),
                this.setMode(a.GF.Idle)
            }
        }
        class X extends l.l {
            start(e) {
                this.config = e,
                super.start(),
                this.app && (this.addSignalListeners(),
                this.onReady.emit(),
                this.handleGameStateChange())
            }
            stop() {
                super.stop(),
                this.app || (this.removeSignalListeners(),
                this.isGameInProgress = !1)
            }
            pause() {
                this.app && (this.app.pauseLoop(),
                this.unlockPointer())
            }
            resume() {
                this.app && (this.lockPointer(),
                this.app.resumeLoop())
            }
            enterGame() {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.app && !this.isGameInProgress && (this.isGameInProgress = !0,
                this.lockPointer(),
                e ? this.app.setMode(a.GF.Tutorial) : this.app.setMode(a.GF.Game))
            }
            lockPointer() {
                null !== document.pointerLockElement || (0,
                r.t)() || void 0 === document.body.requestPointerLock || document.body.requestPointerLock()
            }
            unlockPointer() {
                null === document.pointerLockElement || (0,
                r.t)() || void 0 === document.exitPointerLock || document.exitPointerLock()
            }
            createApp(e) {
                let t = this.config
                  , i = new q(this.container || document.body,t,this.resources,e);
                return i.onReset.add(this.handleReset),
                i
            }
            constructor(...e) {
                super(...e),
                this.onReady = new o.M,
                this.onBeforeReset = new o.M,
                this.onReset = new o.M,
                this.onGameStart = new o.M,
                this.onGameOver = new o.M,
                this.onGameStateChange = new o.M,
                this.onBonusPoints = new o.M,
                this.onTutorialStart = new o.M,
                this.onTutorialComplete = new o.M,
                this.onTutorialStepBegin = new o.M,
                this.onTutorialStepFail = new o.M,
                this.onTutorialStepSuccess = new o.M,
                this.isGameInProgress = !1,
                this.addSignalListeners = ()=>{
                    this.app && (this.app.onBeforeReset.add(this.handleBeforeReset),
                    this.app.onGameStart.add(this.handleGameStart),
                    this.app.onGameOver.add(this.handleGameOver),
                    this.app.onScoreChange.add(this.handleGameStateChange),
                    this.app.onPickupCollectible.add(this.handleGameStateChange),
                    this.app.onDashAvailabilityChange.add(this.handleGameStateChange),
                    this.app.onBonusPoints.add(this.handleBonusPoints),
                    this.app.onTutorialStart.add(this.handleTutorialStart),
                    this.app.onTutorialComplete.add(this.handleTutorialComplete),
                    this.app.onTutorialStepBegin.add(this.handleTutorialStepBegin),
                    this.app.onTutorialStepFail.add(this.handleTutorialStepFail),
                    this.app.onTutorialStepSuccess.add(this.handleTutorialStepSuccess))
                }
                ,
                this.removeSignalListeners = ()=>{
                    this.app && (this.app.onBeforeReset.remove(this.handleBeforeReset),
                    this.app.onGameStart.remove(this.handleGameStart),
                    this.app.onGameOver.remove(this.handleGameOver),
                    this.app.onScoreChange.remove(this.handleGameStateChange),
                    this.app.onPickupCollectible.remove(this.handleGameStateChange),
                    this.app.onDashAvailabilityChange.remove(this.handleGameStateChange),
                    this.app.onBonusPoints.remove(this.handleBonusPoints),
                    this.app.onTutorialStart.remove(this.handleTutorialStart),
                    this.app.onTutorialComplete.remove(this.handleTutorialComplete),
                    this.app.onTutorialStepBegin.remove(this.handleTutorialStepBegin),
                    this.app.onTutorialStepFail.remove(this.handleTutorialStepFail),
                    this.app.onTutorialStepSuccess.remove(this.handleTutorialStepSuccess))
                }
                ,
                this.handleBeforeReset = ()=>{
                    this.onBeforeReset.emit()
                }
                ,
                this.handleReset = e=>{
                    var t;
                    this.onReset.emit(),
                    null === (t = this.app) || void 0 === t || t.onReset.remove(this.handleReset),
                    this.removeSignalListeners(),
                    this.stop(),
                    this.isGameInProgress = !0,
                    this.app = this.createApp(e),
                    this.app.startLoop(),
                    this.addSignalListeners(),
                    this.app.setMode(e.targetMode)
                }
                ,
                this.handleGameStart = ()=>{
                    this.onGameStart.emit()
                }
                ,
                this.handleGameOver = ()=>{
                    this.app && (this.unlockPointer(),
                    this.onGameOver.emit(this.app.getGameData()))
                }
                ,
                this.handleGameStateChange = ()=>{
                    this.app && this.onGameStateChange.emit(this.app.state)
                }
                ,
                this.handleBonusPoints = e=>{
                    this.onBonusPoints.emit(e)
                }
                ,
                this.handleTutorialStart = ()=>{
                    this.onTutorialStart.emit()
                }
                ,
                this.handleTutorialComplete = ()=>{
                    this.onTutorialComplete.emit()
                }
                ,
                this.handleTutorialStepBegin = e=>{
                    this.onTutorialStepBegin.emit(e)
                }
                ,
                this.handleTutorialStepFail = e=>{
                    this.onTutorialStepFail.emit(e)
                }
                ,
                this.handleTutorialStepSuccess = e=>{
                    this.onTutorialStepSuccess.emit(e)
                }
            }
        }
        i(94773);
        var Q = i(16602)
          , Z = i(28076);
        class $extends R.d {
            init() {
                this.state = this.context.state,
                this.player = this.context.components.getComponentOfType(Z.J)
            }
            fixedUpdate() {
                let e = this.state;
                if (e.mode === a.GF.Game) {
                    let t = this.player.entity.transform.position;
                    h.k.logDebug("position: ".concat(t.x, ", ").concat(t.y, ", ").concat(t.z)),
                    h.k.logDebug("gameElapsedTime: ".concat(e.fixedUpdateElapsedTime)),
                    h.k.logDebug("dashAvailable: ".concat(e.dashAvailable.toString()))
                }
            }
        }
        class ee extends q {
            startReplay() {
                this.state.mode !== a.GF.Game && (h.k.logDebug("[".concat(this.name, "] start replay")),
                this.setMode(a.GF.Game))
            }
            modifySystems() {
                let e = this.context.systems.getSystemOfType(y.E)
                  , t = this.context.systems.getSystemOfType(v.$)
                  , i = new Q.H(this.context,this.history)
                  , s = new $(this.context);
                this.context.systems.unregisterSystem(e),
                this.context.systems.unregisterSystem(t),
                this.context.systems.registerSystem(i, 0),
                this.context.systems.registerSystem(s, 0),
                i.init(),
                s.init()
            }
            constructor(e, t, i) {
                let {config: s, history: n} = t;
                super(e, s, i),
                this.name = "ReplayViewer",
                this.history = (0,
                H.Kd)(n),
                this.modifySystems();
                let o = this.context.systems.getSystemOfType(g.z);
                o.onPlayerDeath.add(()=>{
                    h.k.log("Score: ".concat(this.state.score))
                }
                )
            }
        }
        var et = i(82923)
          , ei = i(96995)
          , es = i(23206)
          , en = i(30823)
          , eo = i(22041);
        class er extends E.V {
            init() {
                super.init();
                let e = this.args.renderer;
                e && (this.controls = new eo.z(this.camera,e.getCanvas()),
                this.controls.target.set(0, 0, 0)),
                this.camera.position.set(0, 2, 4),
                this.camera.lookAt(new ei.Pa4)
            }
            dispose() {
                var e;
                null === (e = this.controls) || void 0 === e || e.dispose()
            }
            update() {
                var e;
                null === (e = this.controls) || void 0 === e || e.update()
            }
        }
        var ea = i(10469)
          , el = i(60400)
          , eh = i(10051)
          , ec = i(34551)
          , ed = i(66896);
        class ep extends ed.x {
            init(e) {
                this.addCamera(e),
                this.addLight(e),
                (0,
                eh.i)("grid") && this.addGridPlane(),
                (0,
                eh.i)("axes") && this.addAxes();
                let t = (0,
                eh.i)("id");
                if (t)
                    try {
                        let i = this.context.entityFactory.create(t)
                          , s = i.getComponent(el.i);
                        s && (s.enabled = !1),
                        this.addEntity(i)
                    } catch (n) {
                        h.k.logError(n.toString())
                    }
                this.showColliderHelpers && (0,
                ec.DO)(this.context.entities)
            }
            addCamera(e) {
                let t = new es.J("camera");
                t.addComponent(en.w);
                let i = t.addComponent(er, {
                    renderer: e
                });
                i.getInternalCamera().position.set(0, 1, -5),
                this.addEntity(t)
            }
            addLight(e) {
                let t = e.getRenderContext()
                  , i = new ei.Ox3;
                i.position.set(1, 1, 1),
                t.scene.add(i)
            }
            addGridPlane() {
                let e = new es.J("grid")
                  , t = new ei.VLJ(15,20,10066329,11184810);
                e.addComponent(en.w),
                e.addComponent(ea.H, {
                    mesh: t
                }),
                this.addEntity(e)
            }
            addAxes() {
                let e = new es.J("axes")
                  , t = new ei.y8_;
                e.addComponent(en.w),
                e.addComponent(ea.H, {
                    mesh: t
                }),
                this.addEntity(e)
            }
            constructor(...e) {
                super(...e),
                this.showColliderHelpers = !1
            }
        }
        class eu extends et.a {
            constructor(...e) {
                super(...e),
                this.speed = 40,
                this.fixedUpdateElapsedTime = 0,
                this.timeScale = 1
            }
        }
        class em extends c.g {
            setContainer(e) {
                let t = this.getSystem(_.K)
                  , i = t.renderer;
                i.setContainer(e)
            }
            initScene(e) {
                let t = new e(this.context)
                  , i = this.context.systems.getSystemOfType(_.K)
                  , s = null == i ? void 0 : i.renderer.getRenderContext();
                t.init(null == i ? void 0 : i.renderer);
                let n = this.context.components.getComponentOfType(E.V);
                return s && n && (s.camera = null == n ? void 0 : n.getInternalCamera()),
                t
            }
            constructor(e, t) {
                let i = new eu
                  , s = new u
                  , n = new d.I(i,s,t,"seed")
                  , o = new f(n.time);
                super(n, o),
                this.addSystems([new S.d(n), new _.K(n,{
                    renderer: new C.T({
                        container: e,
                        webglRendererOptions: {
                            alpha: !0,
                            preserveDrawingBuffer: !0
                        }
                    })
                })]),
                this.init(ep),
                window.addEventListener("keypress", e=>{
                    if ("s" === e.key) {
                        var t;
                        let i = null === (t = this.getSystem(_.K)) || void 0 === t ? void 0 : t.renderer
                          , s = i.getCanvas()
                          , n = document.createElement("a");
                        n.href = s.toDataURL("image/png"),
                        n.download = "IMAGE.PNG",
                        n.click()
                    }
                }
                )
            }
        }
        let ef = new X
    },
    50563: function(e, t, i) {
        i.d(t, {
            T: function() {
                return b
            }
        });
        var s = i(96995);
        let n = {
            c: null,
            u: [new s.Pa4, new s.Pa4, new s.Pa4],
            e: []
        }
          , o = {
            c: null,
            u: [new s.Pa4, new s.Pa4, new s.Pa4],
            e: []
        }
          , r = [[], [], []]
          , a = [[], [], []]
          , l = []
          , h = new s.Pa4
          , c = new s.Pa4
          , d = new s.Pa4
          , p = new s.Pa4
          , u = new s.Pa4
          , m = new s.Pa4
          , f = new s.Vkp
          , g = new s.ZzF
          , v = new s.yGw
          , y = new s.yGw
          , x = new s.zHn;
        class b {
            set(e, t, i) {
                return this.center = e,
                this.halfSize = t,
                this.rotation = i,
                this
            }
            copy(e) {
                return this.center.copy(e.center),
                this.halfSize.copy(e.halfSize),
                this.rotation.copy(e.rotation),
                this
            }
            clone() {
                return new this.constructor().copy(this)
            }
            getSize(e) {
                return e.copy(this.halfSize).multiplyScalar(2)
            }
            clampPoint(e, t) {
                let i = this.halfSize;
                p.subVectors(e, this.center),
                this.rotation.extractBasis(h, c, d),
                t.copy(this.center);
                let n = s.M8C.clamp(p.dot(h), -i.x, i.x);
                t.add(h.multiplyScalar(n));
                let o = s.M8C.clamp(p.dot(c), -i.y, i.y);
                t.add(c.multiplyScalar(o));
                let r = s.M8C.clamp(p.dot(d), -i.z, i.z);
                return t.add(d.multiplyScalar(r)),
                t
            }
            containsPoint(e) {
                return p.subVectors(e, this.center),
                this.rotation.extractBasis(h, c, d),
                Math.abs(p.dot(h)) <= this.halfSize.x && Math.abs(p.dot(c)) <= this.halfSize.y && Math.abs(p.dot(d)) <= this.halfSize.z
            }
            intersectsBox3(e) {
                return this.intersectsOBB(S.fromBox3(e))
            }
            intersectsSphere(e) {
                return this.clampPoint(e.center, m),
                m.distanceToSquared(e.center) <= e.radius * e.radius
            }
            intersectsOBB(e) {
                let t, i, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.EPSILON;
                n.c = this.center,
                n.e[0] = this.halfSize.x,
                n.e[1] = this.halfSize.y,
                n.e[2] = this.halfSize.z,
                this.rotation.extractBasis(n.u[0], n.u[1], n.u[2]),
                o.c = e.center,
                o.e[0] = e.halfSize.x,
                o.e[1] = e.halfSize.y,
                o.e[2] = e.halfSize.z,
                e.rotation.extractBasis(o.u[0], o.u[1], o.u[2]);
                for (let h = 0; h < 3; h++)
                    for (let c = 0; c < 3; c++)
                        r[h][c] = n.u[h].dot(o.u[c]);
                p.subVectors(o.c, n.c),
                l[0] = p.dot(n.u[0]),
                l[1] = p.dot(n.u[1]),
                l[2] = p.dot(n.u[2]);
                for (let d = 0; d < 3; d++)
                    for (let u = 0; u < 3; u++)
                        a[d][u] = Math.abs(r[d][u]) + s;
                for (let m = 0; m < 3; m++)
                    if (t = n.e[m],
                    i = o.e[0] * a[m][0] + o.e[1] * a[m][1] + o.e[2] * a[m][2],
                    Math.abs(l[m]) > t + i)
                        return !1;
                for (let f = 0; f < 3; f++)
                    if (t = n.e[0] * a[0][f] + n.e[1] * a[1][f] + n.e[2] * a[2][f],
                    i = o.e[f],
                    Math.abs(l[0] * r[0][f] + l[1] * r[1][f] + l[2] * r[2][f]) > t + i)
                        return !1;
                return t = n.e[1] * a[2][0] + n.e[2] * a[1][0],
                i = o.e[1] * a[0][2] + o.e[2] * a[0][1],
                !(Math.abs(l[2] * r[1][0] - l[1] * r[2][0]) > t + i) && (t = n.e[1] * a[2][1] + n.e[2] * a[1][1],
                i = o.e[0] * a[0][2] + o.e[2] * a[0][0],
                !(Math.abs(l[2] * r[1][1] - l[1] * r[2][1]) > t + i) && (t = n.e[1] * a[2][2] + n.e[2] * a[1][2],
                i = o.e[0] * a[0][1] + o.e[1] * a[0][0],
                !(Math.abs(l[2] * r[1][2] - l[1] * r[2][2]) > t + i) && (t = n.e[0] * a[2][0] + n.e[2] * a[0][0],
                i = o.e[1] * a[1][2] + o.e[2] * a[1][1],
                !(Math.abs(l[0] * r[2][0] - l[2] * r[0][0]) > t + i) && (t = n.e[0] * a[2][1] + n.e[2] * a[0][1],
                i = o.e[0] * a[1][2] + o.e[2] * a[1][0],
                !(Math.abs(l[0] * r[2][1] - l[2] * r[0][1]) > t + i) && (t = n.e[0] * a[2][2] + n.e[2] * a[0][2],
                i = o.e[0] * a[1][1] + o.e[1] * a[1][0],
                !(Math.abs(l[0] * r[2][2] - l[2] * r[0][2]) > t + i) && (t = n.e[0] * a[1][0] + n.e[1] * a[0][0],
                i = o.e[1] * a[2][2] + o.e[2] * a[2][1],
                !(Math.abs(l[1] * r[0][0] - l[0] * r[1][0]) > t + i) && (t = n.e[0] * a[1][1] + n.e[1] * a[0][1],
                i = o.e[0] * a[2][2] + o.e[2] * a[2][0],
                !(Math.abs(l[1] * r[0][1] - l[0] * r[1][1]) > t + i) && (t = n.e[0] * a[1][2] + n.e[1] * a[0][2],
                i = o.e[0] * a[2][1] + o.e[1] * a[2][0],
                !(Math.abs(l[1] * r[0][2] - l[0] * r[1][2]) > t + i)))))))))
            }
            intersectsPlane(e) {
                this.rotation.extractBasis(h, c, d);
                let t = this.halfSize.x * Math.abs(e.normal.dot(h)) + this.halfSize.y * Math.abs(e.normal.dot(c)) + this.halfSize.z * Math.abs(e.normal.dot(d))
                  , i = e.normal.dot(this.center) - e.constant;
                return Math.abs(i) <= t
            }
            intersectRay(e, t) {
                return (this.getSize(u),
                g.setFromCenterAndSize(p.set(0, 0, 0), u),
                v.setFromMatrix3(this.rotation),
                v.setPosition(this.center),
                y.copy(v).invert(),
                x.copy(e).applyMatrix4(y),
                x.intersectBox(g, t)) ? t.applyMatrix4(v) : null
            }
            intersectsRay(e) {
                return null !== this.intersectRay(e, p)
            }
            fromBox3(e) {
                return e.getCenter(this.center),
                e.getSize(this.halfSize).multiplyScalar(.5),
                this.rotation.identity(),
                this
            }
            equals(e) {
                return e.center.equals(this.center) && e.halfSize.equals(this.halfSize) && e.rotation.equals(this.rotation)
            }
            applyMatrix4(e) {
                let t = e.elements
                  , i = p.set(t[0], t[1], t[2]).length()
                  , s = p.set(t[4], t[5], t[6]).length()
                  , n = p.set(t[8], t[9], t[10]).length()
                  , o = e.determinant();
                o < 0 && (i = -i),
                f.setFromMatrix4(e);
                let r = 1 / i
                  , a = 1 / s
                  , l = 1 / n;
                return f.elements[0] *= r,
                f.elements[1] *= r,
                f.elements[2] *= r,
                f.elements[3] *= a,
                f.elements[4] *= a,
                f.elements[5] *= a,
                f.elements[6] *= l,
                f.elements[7] *= l,
                f.elements[8] *= l,
                this.rotation.multiply(f),
                this.halfSize.x *= i,
                this.halfSize.y *= s,
                this.halfSize.z *= n,
                p.setFromMatrixPosition(e),
                this.center.add(p),
                this
            }
            constructor(e=new s.Pa4, t=new s.Pa4, i=new s.Vkp) {
                this.center = e,
                this.halfSize = t,
                this.rotation = i
            }
        }
        let S = new b
    },
    81110: function(e, t, i) {
        i.d(t, {
            i: function() {
                return n
            }
        });
        var s = i(96995);
        class n extends s.jyz {
            update(e) {
                this.uniforms.progress.value = e
            }
            constructor(e) {
                let {color: t, map: i} = e;
                super({
                    uniforms: {
                        tint: {
                            value: new s.Ilk(t)
                        },
                        map: {
                            value: i
                        },
                        opacity: {
                            value: 1
                        },
                        progress: {
                            value: 0
                        }
                    },
                    vertexShader: "\n        varying vec2 vUv;\n        varying vec4 vColor;\n        uniform float progress;\n\n        vec4 LinearTosRGB( in vec4 value ) {\n          return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n        }\n\n        void main() {\n          vUv = uv;\n          vColor = LinearTosRGB(color);\n\n          vUv.y -= progress * 5.0;\n\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
                    fragmentShader: "\n        uniform sampler2D map;\n        uniform vec3 tint;\n        uniform float offset;\n        uniform float opacity;\n        varying vec2 vUv;\n        varying vec4 vColor;\n\n        void main() {\n          vec4 mapSampling = texture2D(map, vUv);\n\n          float fadeIn = smoothstep(0.0, 0.1, vColor.r);\n          float fadeOut = 1.0 - smoothstep(0.5, 0.7, vColor.r);\n          float alpha = mapSampling.r * opacity * fadeIn * fadeOut;\n\n          vec3 finalColor = mix(tint, vec3(1.0), mapSampling.g);\n\n          gl_FragColor = vec4(finalColor, alpha);\n\n          #include <encodings_fragment>\n        }\n      "
                }),
                this.vertexColors = !0,
                this.transparent = !0,
                this.side = s.ehD,
                this.depthWrite = !1
            }
        }
    },
    62686: function(e, t, i) {
        i.d(t, {
            m: function() {
                return a
            }
        });
        var s = i(23206)
          , n = i(30823)
          , o = i(2064)
          , r = i(79118);
        function a(e) {
            let t = new s.J("fx_bubble_trail");
            return t.addComponent(n.w),
            t.addComponent(r.H, {
                map: (0,
                o.Hp)("bubble", e),
                color: 7337858
            }),
            t
        }
    },
    2945: function(e, t, i) {
        i.d(t, {
            b: function() {
                return d
            }
        });
        var s = i(2064)
          , n = i(30823)
          , o = i(96995)
          , r = i(79432)
          , a = i(26954)
          , l = i(94573);
        class h extends l.D {
            init() {
                this.args.count = 400,
                this.args.color = 7337858,
                this.args.size = .5,
                super.init(),
                this.initPoints()
            }
            fixedUpdate(e, t) {
                this.animate(e.fixedDelta, t.speed * t.globalSpeedFactor, t.timeScale)
            }
            initPoints() {
                let e = new o.Pa4
                  , t = 0;
                for (; t < 400; ) {
                    (0,
                    a.C)(5.5, 200, e);
                    let {x: i, y: s, z: n} = e;
                    this.noise(.1 * i, .1 * s, .1 * n) > .8 && (this.setPosition(t, i, s, n),
                    this.setSize(t, o.M8C.mapLinear(Math.random(), 0, 1, .1, 1)),
                    t += 1)
                }
                this.sortPoints()
            }
            constructor(...e) {
                super(...e),
                this.noise = (0,
                r.zz)(),
                this.animate = (()=>{
                    let e = new o.Pa4;
                    return (t,i,s)=>{
                        for (let n = 0; n < 400; n += 1) {
                            this.getPosition(n, e);
                            let o = e.z - i * t
                              , r = e.y + 1 * t * s
                              , a = e.x + .03 * this.noise(0, .5 * r, 0) * s;
                            o < 0 && (o = 200,
                            this.cycleIndices()),
                            r > 5.5 && (r = -5.5),
                            a > 5.5 && (a = -5.5),
                            a < -5.5 && (a = 5.5),
                            this.setPosition(n, a, r, o)
                        }
                        this.invalidatePositions(),
                        this.invalidateIndices()
                    }
                }
                )()
            }
        }
        var c = i(23206);
        function d(e) {
            let t = new c.J("fx_bubbles");
            return t.addComponent(n.w),
            t.addComponent(h, {
                map: (0,
                s.Hp)("bubble", e)
            }),
            t
        }
    },
    35233: function(e, t, i) {
        i.d(t, {
            _: function() {
                return d
            }
        });
        var s = i(96995)
          , n = i(23206)
          , o = i(2064)
          , r = i(30823)
          , a = i(86529)
          , l = i(10469)
          , h = i(90283);
        class c extends h.w {
            init() {
                let e = this.entity.getComponent(l.H)
                  , t = this.entity.getComponent(a.S);
                e && (this.mesh = e.mesh),
                t && (this.outline = t.mesh)
            }
            fixedUpdate(e, t) {
                let i = t.speed * e.fixedDelta * this.rotationSpeed;
                this.mesh && (this.mesh.rotation.z += i),
                this.outline && (this.outline.rotation.z += i)
            }
            constructor(...e) {
                super(...e),
                this.rotationSpeed = .2
            }
        }
        function d(e, t) {
            let i = new n.J("character");
            i.addComponent(r.w);
            let h = (0,
            o.Hp)("".concat(e, "_basecolor"), t);
            h && (h.flipY = !1);
            let d = (0,
            o.Bo)(e, t);
            if (d) {
                let p = d.scene.children[0].clone();
                p.traverse(e=>{
                    e instanceof s.Kj0 && (e.material = new s.IKL({
                        color: 16777215,
                        gradientMap: (0,
                        o.Hp)("threeTone", t),
                        map: h
                    }))
                }
                ),
                p.clear(),
                i.addComponent(l.H, {
                    mesh: p
                }),
                i.addComponent(a.S, {
                    mesh: p,
                    outlineWidth: 1.5
                });
                let u = function(e, t) {
                    let i = new n.J("character_propeller");
                    i.addComponent(r.w);
                    let h = (0,
                    o.Hp)("".concat(e, "_basecolor"), t);
                    h && (h.flipY = !1);
                    let d = (0,
                    o.Bo)(e, t);
                    if (d) {
                        var p;
                        let u = null === (p = d.scene.getObjectByName("propeller")) || void 0 === p ? void 0 : p.clone();
                        u && (u.material = new s.IKL({
                            color: 16777215,
                            gradientMap: (0,
                            o.Hp)("threeTone", t),
                            map: h
                        }),
                        u.parent = null,
                        i.addComponent(l.H, {
                            mesh: u
                        }),
                        i.addComponent(a.S, {
                            mesh: u,
                            outlineWidth: 1.5
                        }),
                        i.addComponent(c))
                    }
                    return i
                }(e, t);
                i.add(u)
            }
            return i
        }
    },
    72016: function(e, t, i) {
        i.d(t, {
            C: function() {
                return d
            }
        });
        var s = i(96995);
        class n extends s.Kj0 {
            constructor(e, t=16711935) {
                let i = new s.Pa4;
                e.getSize(i);
                let n = new s.DvJ(i.x,i.y,i.z)
                  , o = new s.vBJ({
                    wireframe: !0,
                    color: t
                });
                super(n, o)
            }
        }
        var o = i(50563)
          , r = i(90283);
        class a extends r.w {
            init() {
                this.obb = this.args.obb || new o.T,
                this.updateTransform()
            }
            updateTransform() {
                let {transform: e} = this.entity;
                if (this.obb) {
                    let t = this.obb.center
                      , i = new s.yGw().setFromMatrix3(this.obb.rotation)
                      , n = new s.USm().setFromRotationMatrix(i);
                    e.position.copy(t),
                    e.rotation.copy(n)
                }
            }
            fixedUpdate() {
                this.updateTransform()
            }
        }
        var l = i(23206)
          , h = i(30823)
          , c = i(10469);
        function d(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "obbHelper"
              , i = new l.J(t)
              , s = new n(e);
            return i.addComponent(h.w),
            i.addComponent(c.H, {
                mesh: s
            }),
            i.addComponent(a, {
                obb: e
            }),
            i
        }
    },
    3361: function(e, t, i) {
        i.d(t, {
            M: function() {
                return v
            }
        });
        var s = i(34551)
          , n = i(28076)
          , o = i(35233)
          , r = i(62686)
          , a = i(23206)
          , l = i(2064)
          , h = i(30823)
          , c = i(10469)
          , d = i(96995)
          , p = i(90283);
        class u extends p.w {
            init() {
                let e = this.entity.getComponent(c.H);
                if (e) {
                    var t;
                    this.material = null === (t = e.mesh) || void 0 === t ? void 0 : t.material
                }
            }
            fixedUpdate(e, t) {
                if (this.material) {
                    let i = t.dashCooldownProgress
                      , s = d.M8C.clamp(d.M8C.mapLinear(i, .95, 1, 0, 1), 0, 1);
                    this.material.update(e, i, s)
                }
            }
        }
        class m extends d.jyz {
            update(e, t, i) {
                this.uniforms.progress.value = t,
                this.uniforms.glowIntensity.value = i
            }
            constructor(e) {
                let {color: t, map: i} = e;
                super({
                    uniforms: {
                        tint: {
                            value: new d.Ilk(t)
                        },
                        map: {
                            value: i
                        },
                        progress: {
                            value: 1
                        },
                        opacity: {
                            value: 1
                        },
                        glowIntensity: {
                            value: 1
                        }
                    },
                    vertexShader: "\n        varying vec2 vUv;\n\n        void main() {\n          vUv = uv;\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n      ",
                    fragmentShader: "\n        uniform sampler2D map;\n        uniform vec3 tint;\n        uniform float progress;\n        uniform float opacity;\n        uniform float glowIntensity;\n        varying vec2 vUv;\n\n        void main() {\n          vec4 mapSampling = texture2D(map, vUv);\n\n          float alpha = mapSampling.r * opacity;\n          float glow = mapSampling.g;\n\n          alpha *= step(mapSampling.b, progress);\n          alpha += mix(0.0, glow, glowIntensity);\n\n          gl_FragColor = vec4(tint, alpha);\n\n          #include <encodings_fragment>\n        }\n      "
                }),
                this.transparent = !0
            }
        }
        var f = i(6268)
          , g = i(81110);
        function v(e, t) {
            let i = (0,
            o._)(e, t)
              , d = (0,
            r.m)(t);
            d.transform.position.set(0, -.6, -.96),
            i.add(d);
            let p = function(e) {
                let t = new a.J("dash_circle");
                t.addComponent(h.w);
                let i = (0,
                l.Hp)("dashCircle", e);
                i && (i.flipY = !1);
                let s = (0,
                l.Xh)("dash_circle", e);
                return s && (s.material = new m({
                    color: 7337858,
                    map: i
                }),
                t.addComponent(c.H, {
                    mesh: s
                }),
                t.addComponent(u)),
                t
            }(t);
            i.add(p);
            let v = function(e) {
                let t = new a.J("pickup_effect");
                t.addComponent(h.w);
                let i = (0,
                l.Hp)("trail", e)
                  , s = (0,
                l.Xh)("converging_lines", e);
                return i && (i.anisotropy = 16,
                i.flipY = !1),
                s && (s.material = new g.i({
                    color: 16777215,
                    map: i
                }),
                t.addComponent(c.H, {
                    mesh: s
                }),
                t.addComponent(f.g)),
                t
            }(t);
            return i.add(v),
            i.addComponent(n.J),
            (0,
            s.JD)("player", i),
            (0,
            s.RC)(i),
            i
        }
    },
    9675: function(e, t, i) {
        i.d(t, {
            s: function() {
                return c
            }
        });
        var s = i(23206)
          , n = i(30823)
          , o = i(96995)
          , r = i(90283);
        class a extends r.w {
            init() {
                this.sphere = this.args.sphere,
                this.updateTransform()
            }
            updateTransform() {
                let {transform: e} = this.entity
                  , t = this.sphere.center;
                e.position.copy(t)
            }
            fixedUpdate() {
                this.updateTransform()
            }
            constructor(...e) {
                super(...e),
                this.sphere = new o.aLr
            }
        }
        var l = i(10469);
        class h extends o.Kj0 {
            constructor(e, t=16711935) {
                let i = new o.xo$(e,8,8)
                  , s = new o.vBJ({
                    wireframe: !0,
                    color: t
                });
                super(i, s)
            }
        }
        function c(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "sphereHelper"
              , i = new s.J(t)
              , o = new h(e.radius);
            return i.addComponent(n.w),
            i.addComponent(l.H, {
                mesh: o
            }),
            i.addComponent(a, {
                sphere: e
            }),
            i
        }
    },
    19295: function(e, t, i) {
        i.d(t, {
            l: function() {
                return et
            },
            B: function() {
                return ee
            }
        });
        var s = i(38184)
          , n = i(84045)
          , o = i(60069)
          , r = i(96995);
        class a extends r.aNw {
            load(e, t, i, s) {
                let n;
                let o = this;
                n = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : r.Zp0.extractUrlBase(e),
                this.manager.itemStart(e);
                let a = function(t) {
                    s ? s(t) : console.error(t),
                    o.manager.itemError(e),
                    o.manager.itemEnd(e)
                }
                  , l = new r.hH6(this.manager);
                l.setPath(this.path),
                l.setResponseType("arraybuffer"),
                l.setRequestHeader(this.requestHeader),
                l.setWithCredentials(this.withCredentials),
                l.load(e, function(i) {
                    try {
                        o.parse(i, n, function(i) {
                            t(i),
                            o.manager.itemEnd(e)
                        }, a)
                    } catch (s) {
                        a(s)
                    }
                }, i, a)
            }
            setDRACOLoader(e) {
                return this.dracoLoader = e,
                this
            }
            setDDSLoader() {
                throw Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
            }
            setKTX2Loader(e) {
                return this.ktx2Loader = e,
                this
            }
            setMeshoptDecoder(e) {
                return this.meshoptDecoder = e,
                this
            }
            register(e) {
                return -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e),
                this
            }
            unregister(e) {
                return -1 !== this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
                this
            }
            parse(e, t, i, s) {
                let n;
                let o = {}
                  , a = {};
                if ("string" == typeof e)
                    n = JSON.parse(e);
                else if (e instanceof ArrayBuffer) {
                    let l = r.Zp0.decodeText(new Uint8Array(e,0,4));
                    if (l === T) {
                        try {
                            o[h.KHR_BINARY_GLTF] = new P(e)
                        } catch (c) {
                            s && s(c);
                            return
                        }
                        n = JSON.parse(o[h.KHR_BINARY_GLTF].content)
                    } else
                        n = JSON.parse(r.Zp0.decodeText(new Uint8Array(e)))
                } else
                    n = e;
                if (void 0 === n.asset || n.asset.version[0] < 2) {
                    s && s(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
                    return
                }
                let p = new Y(n,{
                    path: t || this.resourcePath || "",
                    crossOrigin: this.crossOrigin,
                    requestHeader: this.requestHeader,
                    manager: this.manager,
                    ktx2Loader: this.ktx2Loader,
                    meshoptDecoder: this.meshoptDecoder
                });
                p.fileLoader.setRequestHeader(this.requestHeader);
                for (let u = 0; u < this.pluginCallbacks.length; u++) {
                    let m = this.pluginCallbacks[u](p);
                    a[m.name] = m,
                    o[m.name] = !0
                }
                if (n.extensionsUsed)
                    for (let f = 0; f < n.extensionsUsed.length; ++f) {
                        let g = n.extensionsUsed[f]
                          , v = n.extensionsRequired || [];
                        switch (g) {
                        case h.KHR_MATERIALS_UNLIT:
                            o[g] = new d;
                            break;
                        case h.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
                            o[g] = new A;
                            break;
                        case h.KHR_DRACO_MESH_COMPRESSION:
                            o[g] = new E(n,this.dracoLoader);
                            break;
                        case h.KHR_TEXTURE_TRANSFORM:
                            o[g] = new M;
                            break;
                        case h.KHR_MESH_QUANTIZATION:
                            o[g] = new D;
                            break;
                        default:
                            v.indexOf(g) >= 0 && void 0 === a[g] && console.warn('THREE.GLTFLoader: Unknown extension "' + g + '".')
                        }
                    }
                p.setExtensions(o),
                p.setPlugins(a),
                p.parse(i, s)
            }
            parseAsync(e, t) {
                let i = this;
                return new Promise(function(s, n) {
                    i.parse(e, t, s, n)
                }
                )
            }
            constructor(e) {
                super(e),
                this.dracoLoader = null,
                this.ktx2Loader = null,
                this.meshoptDecoder = null,
                this.pluginCallbacks = [],
                this.register(function(e) {
                    return new u(e)
                }),
                this.register(function(e) {
                    return new b(e)
                }),
                this.register(function(e) {
                    return new S(e)
                }),
                this.register(function(e) {
                    return new f(e)
                }),
                this.register(function(e) {
                    return new g(e)
                }),
                this.register(function(e) {
                    return new v(e)
                }),
                this.register(function(e) {
                    return new y(e)
                }),
                this.register(function(e) {
                    return new p(e)
                }),
                this.register(function(e) {
                    return new x(e)
                }),
                this.register(function(e) {
                    return new m(e)
                }),
                this.register(function(e) {
                    return new c(e)
                }),
                this.register(function(e) {
                    return new w(e)
                }),
                this.register(function(e) {
                    return new _(e)
                })
            }
        }
        function l() {
            let e = {};
            return {
                get: function(t) {
                    return e[t]
                },
                add: function(t, i) {
                    e[t] = i
                },
                remove: function(t) {
                    delete e[t]
                },
                removeAll: function() {
                    e = {}
                }
            }
        }
        let h = {
            KHR_BINARY_GLTF: "KHR_binary_glTF",
            KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
            KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
            KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
            KHR_MATERIALS_IOR: "KHR_materials_ior",
            KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
            KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
            KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
            KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
            KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
            KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
            KHR_MATERIALS_VOLUME: "KHR_materials_volume",
            KHR_TEXTURE_BASISU: "KHR_texture_basisu",
            KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
            KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
            KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
            EXT_TEXTURE_WEBP: "EXT_texture_webp",
            EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
            EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
        };
        class c {
            _markDefs() {
                let e = this.parser
                  , t = this.parser.json.nodes || [];
                for (let i = 0, s = t.length; i < s; i++) {
                    let n = t[i];
                    n.extensions && n.extensions[this.name] && void 0 !== n.extensions[this.name].light && e._addNodeRef(this.cache, n.extensions[this.name].light)
                }
            }
            _loadLight(e) {
                let t;
                let i = this.parser
                  , s = "light:" + e
                  , n = i.cache.get(s);
                if (n)
                    return n;
                let o = i.json
                  , a = o.extensions && o.extensions[this.name] || {}
                  , l = a.lights || []
                  , h = l[e]
                  , c = new r.Ilk(16777215);
                void 0 !== h.color && c.fromArray(h.color);
                let d = void 0 !== h.range ? h.range : 0;
                switch (h.type) {
                case "directional":
                    (t = new r.Ox3(c)).target.position.set(0, 0, -1),
                    t.add(t.target);
                    break;
                case "point":
                    (t = new r.cek(c)).distance = d;
                    break;
                case "spot":
                    (t = new r.PMe(c)).distance = d,
                    h.spot = h.spot || {},
                    h.spot.innerConeAngle = void 0 !== h.spot.innerConeAngle ? h.spot.innerConeAngle : 0,
                    h.spot.outerConeAngle = void 0 !== h.spot.outerConeAngle ? h.spot.outerConeAngle : Math.PI / 4,
                    t.angle = h.spot.outerConeAngle,
                    t.penumbra = 1 - h.spot.innerConeAngle / h.spot.outerConeAngle,
                    t.target.position.set(0, 0, -1),
                    t.add(t.target);
                    break;
                default:
                    throw Error("THREE.GLTFLoader: Unexpected light type: " + h.type)
                }
                return t.position.set(0, 0, 0),
                t.decay = 2,
                void 0 !== h.intensity && (t.intensity = h.intensity),
                t.name = i.createUniqueName(h.name || "light_" + e),
                n = Promise.resolve(t),
                i.cache.add(s, n),
                n
            }
            createNodeAttachment(e) {
                let t = this
                  , i = this.parser
                  , s = i.json
                  , n = s.nodes[e]
                  , o = n.extensions && n.extensions[this.name] || {}
                  , r = o.light;
                return void 0 === r ? null : this._loadLight(r).then(function(e) {
                    return i._getNodeRef(t.cache, r, e)
                })
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_LIGHTS_PUNCTUAL,
                this.cache = {
                    refs: {},
                    uses: {}
                }
            }
        }
        class d {
            getMaterialType() {
                return r.vBJ
            }
            extendParams(e, t, i) {
                let s = [];
                e.color = new r.Ilk(1,1,1),
                e.opacity = 1;
                let n = t.pbrMetallicRoughness;
                if (n) {
                    if (Array.isArray(n.baseColorFactor)) {
                        let o = n.baseColorFactor;
                        e.color.fromArray(o),
                        e.opacity = o[3]
                    }
                    void 0 !== n.baseColorTexture && s.push(i.assignTexture(e, "map", n.baseColorTexture, r.knz))
                }
                return Promise.all(s)
            }
            constructor() {
                this.name = h.KHR_MATERIALS_UNLIT
            }
        }
        class p {
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = s.extensions[this.name].emissiveStrength;
                return void 0 !== n && (t.emissiveIntensity = n),
                Promise.resolve()
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_EMISSIVE_STRENGTH
            }
        }
        class u {
            getMaterialType(e) {
                let t = this.parser
                  , i = t.json.materials[e];
                return i.extensions && i.extensions[this.name] ? r.EJi : null
            }
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = []
                  , o = s.extensions[this.name];
                if (void 0 !== o.clearcoatFactor && (t.clearcoat = o.clearcoatFactor),
                void 0 !== o.clearcoatTexture && n.push(i.assignTexture(t, "clearcoatMap", o.clearcoatTexture)),
                void 0 !== o.clearcoatRoughnessFactor && (t.clearcoatRoughness = o.clearcoatRoughnessFactor),
                void 0 !== o.clearcoatRoughnessTexture && n.push(i.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)),
                void 0 !== o.clearcoatNormalTexture && (n.push(i.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)),
                void 0 !== o.clearcoatNormalTexture.scale)) {
                    let a = o.clearcoatNormalTexture.scale;
                    t.clearcoatNormalScale = new r.FM8(a,a)
                }
                return Promise.all(n)
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_CLEARCOAT
            }
        }
        class m {
            getMaterialType(e) {
                let t = this.parser
                  , i = t.json.materials[e];
                return i.extensions && i.extensions[this.name] ? r.EJi : null
            }
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = []
                  , o = s.extensions[this.name];
                return void 0 !== o.iridescenceFactor && (t.iridescence = o.iridescenceFactor),
                void 0 !== o.iridescenceTexture && n.push(i.assignTexture(t, "iridescenceMap", o.iridescenceTexture)),
                void 0 !== o.iridescenceIor && (t.iridescenceIOR = o.iridescenceIor),
                void 0 === t.iridescenceThicknessRange && (t.iridescenceThicknessRange = [100, 400]),
                void 0 !== o.iridescenceThicknessMinimum && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum),
                void 0 !== o.iridescenceThicknessMaximum && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum),
                void 0 !== o.iridescenceThicknessTexture && n.push(i.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)),
                Promise.all(n)
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_IRIDESCENCE
            }
        }
        class f {
            getMaterialType(e) {
                let t = this.parser
                  , i = t.json.materials[e];
                return i.extensions && i.extensions[this.name] ? r.EJi : null
            }
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = [];
                t.sheenColor = new r.Ilk(0,0,0),
                t.sheenRoughness = 0,
                t.sheen = 1;
                let o = s.extensions[this.name];
                return void 0 !== o.sheenColorFactor && t.sheenColor.fromArray(o.sheenColorFactor),
                void 0 !== o.sheenRoughnessFactor && (t.sheenRoughness = o.sheenRoughnessFactor),
                void 0 !== o.sheenColorTexture && n.push(i.assignTexture(t, "sheenColorMap", o.sheenColorTexture, r.knz)),
                void 0 !== o.sheenRoughnessTexture && n.push(i.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)),
                Promise.all(n)
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_SHEEN
            }
        }
        class g {
            getMaterialType(e) {
                let t = this.parser
                  , i = t.json.materials[e];
                return i.extensions && i.extensions[this.name] ? r.EJi : null
            }
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = []
                  , o = s.extensions[this.name];
                return void 0 !== o.transmissionFactor && (t.transmission = o.transmissionFactor),
                void 0 !== o.transmissionTexture && n.push(i.assignTexture(t, "transmissionMap", o.transmissionTexture)),
                Promise.all(n)
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_TRANSMISSION
            }
        }
        class v {
            getMaterialType(e) {
                let t = this.parser
                  , i = t.json.materials[e];
                return i.extensions && i.extensions[this.name] ? r.EJi : null
            }
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = []
                  , o = s.extensions[this.name];
                t.thickness = void 0 !== o.thicknessFactor ? o.thicknessFactor : 0,
                void 0 !== o.thicknessTexture && n.push(i.assignTexture(t, "thicknessMap", o.thicknessTexture)),
                t.attenuationDistance = o.attenuationDistance || 1 / 0;
                let a = o.attenuationColor || [1, 1, 1];
                return t.attenuationColor = new r.Ilk(a[0],a[1],a[2]),
                Promise.all(n)
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_VOLUME
            }
        }
        class y {
            getMaterialType(e) {
                let t = this.parser
                  , i = t.json.materials[e];
                return i.extensions && i.extensions[this.name] ? r.EJi : null
            }
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = s.extensions[this.name];
                return t.ior = void 0 !== n.ior ? n.ior : 1.5,
                Promise.resolve()
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_IOR
            }
        }
        class x {
            getMaterialType(e) {
                let t = this.parser
                  , i = t.json.materials[e];
                return i.extensions && i.extensions[this.name] ? r.EJi : null
            }
            extendMaterialParams(e, t) {
                let i = this.parser
                  , s = i.json.materials[e];
                if (!s.extensions || !s.extensions[this.name])
                    return Promise.resolve();
                let n = []
                  , o = s.extensions[this.name];
                t.specularIntensity = void 0 !== o.specularFactor ? o.specularFactor : 1,
                void 0 !== o.specularTexture && n.push(i.assignTexture(t, "specularIntensityMap", o.specularTexture));
                let a = o.specularColorFactor || [1, 1, 1];
                return t.specularColor = new r.Ilk(a[0],a[1],a[2]),
                void 0 !== o.specularColorTexture && n.push(i.assignTexture(t, "specularColorMap", o.specularColorTexture, r.knz)),
                Promise.all(n)
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_MATERIALS_SPECULAR
            }
        }
        class b {
            loadTexture(e) {
                let t = this.parser
                  , i = t.json
                  , s = i.textures[e];
                if (!s.extensions || !s.extensions[this.name])
                    return null;
                let n = s.extensions[this.name]
                  , o = t.options.ktx2Loader;
                if (!o) {
                    if (!(i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0))
                        return null;
                    throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures")
                }
                return t.loadTextureImage(e, n.source, o)
            }
            constructor(e) {
                this.parser = e,
                this.name = h.KHR_TEXTURE_BASISU
            }
        }
        class S {
            loadTexture(e) {
                let t = this.name
                  , i = this.parser
                  , s = i.json
                  , n = s.textures[e];
                if (!n.extensions || !n.extensions[t])
                    return null;
                let o = n.extensions[t]
                  , r = s.images[o.source]
                  , a = i.textureLoader;
                if (r.uri) {
                    let l = i.options.manager.getHandler(r.uri);
                    null !== l && (a = l)
                }
                return this.detectSupport().then(function(n) {
                    if (n)
                        return i.loadTextureImage(e, o.source, a);
                    if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
                        throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
                    return i.loadTexture(e)
                })
            }
            detectSupport() {
                return this.isSupported || (this.isSupported = new Promise(function(e) {
                    let t = new Image;
                    t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                    t.onload = t.onerror = function() {
                        e(1 === t.height)
                    }
                }
                )),
                this.isSupported
            }
            constructor(e) {
                this.parser = e,
                this.name = h.EXT_TEXTURE_WEBP,
                this.isSupported = null
            }
        }
        class w {
            loadBufferView(e) {
                let t = this.parser.json
                  , i = t.bufferViews[e];
                if (!i.extensions || !i.extensions[this.name])
                    return null;
                {
                    let s = i.extensions[this.name]
                      , n = this.parser.getDependency("buffer", s.buffer)
                      , o = this.parser.options.meshoptDecoder;
                    if (!o || !o.supported) {
                        if (!(t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0))
                            return null;
                        throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files")
                    }
                    return n.then(function(e) {
                        let t = s.byteOffset || 0
                          , i = s.byteLength || 0
                          , n = s.count
                          , r = s.byteStride
                          , a = new Uint8Array(e,t,i);
                        return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(n, r, a, s.mode, s.filter).then(function(e) {
                            return e.buffer
                        }) : o.ready.then(function() {
                            let e = new ArrayBuffer(n * r);
                            return o.decodeGltfBuffer(new Uint8Array(e), n, r, a, s.mode, s.filter),
                            e
                        })
                    })
                }
            }
            constructor(e) {
                this.name = h.EXT_MESHOPT_COMPRESSION,
                this.parser = e
            }
        }
        class _ {
            createNodeMesh(e) {
                let t = this.parser.json
                  , i = t.nodes[e];
                if (!i.extensions || !i.extensions[this.name] || void 0 === i.mesh)
                    return null;
                let s = t.meshes[i.mesh];
                for (let n of s.primitives)
                    if (n.mode !== I.TRIANGLES && n.mode !== I.TRIANGLE_STRIP && n.mode !== I.TRIANGLE_FAN && void 0 !== n.mode)
                        return null;
                let o = i.extensions[this.name]
                  , a = o.attributes
                  , l = []
                  , h = {};
                for (let c in a)
                    l.push(this.parser.getDependency("accessor", a[c]).then(e=>(h[c] = e,
                    h[c])));
                return l.length < 1 ? null : (l.push(this.parser.createNodeMesh(e)),
                Promise.all(l).then(e=>{
                    let t = e.pop()
                      , i = t.isGroup ? t.children : [t]
                      , s = e[0].count
                      , n = [];
                    for (let o of i) {
                        let a = new r.yGw
                          , l = new r.Pa4
                          , c = new r._fP
                          , d = new r.Pa4(1,1,1)
                          , p = new r.SPe(o.geometry,o.material,s);
                        for (let u = 0; u < s; u++)
                            h.TRANSLATION && l.fromBufferAttribute(h.TRANSLATION, u),
                            h.ROTATION && c.fromBufferAttribute(h.ROTATION, u),
                            h.SCALE && d.fromBufferAttribute(h.SCALE, u),
                            p.setMatrixAt(u, a.compose(l, c, d));
                        for (let m in h)
                            "TRANSLATION" !== m && "ROTATION" !== m && "SCALE" !== m && o.geometry.setAttribute(m, h[m]);
                        r.Tme.prototype.copy.call(p, o),
                        p.frustumCulled = !1,
                        this.parser.assignFinalMaterial(p),
                        n.push(p)
                    }
                    return t.isGroup ? (t.clear(),
                    t.add(...n),
                    t) : n[0]
                }
                ))
            }
            constructor(e) {
                this.name = h.EXT_MESH_GPU_INSTANCING,
                this.parser = e
            }
        }
        let T = "glTF"
          , C = {
            JSON: 1313821514,
            BIN: 5130562
        };
        class P {
            constructor(e) {
                this.name = h.KHR_BINARY_GLTF,
                this.content = null,
                this.body = null;
                let t = new DataView(e,0,12);
                if (this.header = {
                    magic: r.Zp0.decodeText(new Uint8Array(e.slice(0, 4))),
                    version: t.getUint32(4, !0),
                    length: t.getUint32(8, !0)
                },
                this.header.magic !== T)
                    throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
                if (this.header.version < 2)
                    throw Error("THREE.GLTFLoader: Legacy binary file detected.");
                let i = this.header.length - 12
                  , s = new DataView(e,12)
                  , n = 0;
                for (; n < i; ) {
                    let o = s.getUint32(n, !0);
                    n += 4;
                    let a = s.getUint32(n, !0);
                    if (n += 4,
                    a === C.JSON) {
                        let l = new Uint8Array(e,12 + n,o);
                        this.content = r.Zp0.decodeText(l)
                    } else if (a === C.BIN) {
                        let c = 12 + n;
                        this.body = e.slice(c, c + o)
                    }
                    n += o
                }
                if (null === this.content)
                    throw Error("THREE.GLTFLoader: JSON content not found.")
            }
        }
        class E {
            decodePrimitive(e, t) {
                let i = this.json
                  , s = this.dracoLoader
                  , n = e.extensions[this.name].bufferView
                  , o = e.extensions[this.name].attributes
                  , r = {}
                  , a = {}
                  , l = {};
                for (let h in o) {
                    let c = G[h] || h.toLowerCase();
                    r[c] = o[h]
                }
                for (let d in e.attributes) {
                    let p = G[d] || d.toLowerCase();
                    if (void 0 !== o[d]) {
                        let u = i.accessors[e.attributes[d]]
                          , m = F[u.componentType];
                        l[p] = m.name,
                        a[p] = !0 === u.normalized
                    }
                }
                return t.getDependency("bufferView", n).then(function(e) {
                    return new Promise(function(t) {
                        s.decodeDracoFile(e, function(e) {
                            for (let i in e.attributes) {
                                let s = e.attributes[i]
                                  , n = a[i];
                                void 0 !== n && (s.normalized = n)
                            }
                            t(e)
                        }, r, l)
                    }
                    )
                })
            }
            constructor(e, t) {
                if (!t)
                    throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
                this.name = h.KHR_DRACO_MESH_COMPRESSION,
                this.json = e,
                this.dracoLoader = t,
                this.dracoLoader.preload()
            }
        }
        class M {
            extendTexture(e, t) {
                return void 0 !== t.texCoord && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'),
                void 0 === t.offset && void 0 === t.rotation && void 0 === t.scale || (e = e.clone(),
                void 0 !== t.offset && e.offset.fromArray(t.offset),
                void 0 !== t.rotation && (e.rotation = t.rotation),
                void 0 !== t.scale && e.repeat.fromArray(t.scale),
                e.needsUpdate = !0),
                e
            }
            constructor() {
                this.name = h.KHR_TEXTURE_TRANSFORM
            }
        }
        class R extends r.Wid {
            copy(e) {
                return super.copy(e),
                this.specularMap = e.specularMap,
                this.specular.copy(e.specular),
                this.glossinessMap = e.glossinessMap,
                this.glossiness = e.glossiness,
                delete this.metalness,
                delete this.roughness,
                delete this.metalnessMap,
                delete this.roughnessMap,
                this
            }
            constructor(e) {
                super(),
                this.isGLTFSpecularGlossinessMaterial = !0;
                let t = {
                    specular: {
                        value: new r.Ilk().setHex(16777215)
                    },
                    glossiness: {
                        value: 1
                    },
                    specularMap: {
                        value: null
                    },
                    glossinessMap: {
                        value: null
                    }
                };
                this._extraUniforms = t,
                this.onBeforeCompile = function(e) {
                    for (let i in t)
                        e.uniforms[i] = t[i];
                    e.fragmentShader = e.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif").replace("#include <metalnessmap_pars_fragment>", "#ifdef USE_GLOSSINESSMAP\n	uniform sampler2D glossinessMap;\n#endif").replace("#include <roughnessmap_fragment>", "vec3 specularFactor = specular;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture\n	specularFactor *= texelSpecular.rgb;\n#endif").replace("#include <metalnessmap_fragment>", "float glossinessFactor = glossiness;\n#ifdef USE_GLOSSINESSMAP\n	vec4 texelGlossiness = texture2D( glossinessMap, vUv );\n	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture\n	glossinessFactor *= texelGlossiness.a;\n#endif").replace("#include <lights_physical_fragment>", "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\nmaterial.specularColor = specularFactor;")
                }
                ,
                Object.defineProperties(this, {
                    specular: {
                        get: function() {
                            return t.specular.value
                        },
                        set: function(e) {
                            t.specular.value = e
                        }
                    },
                    specularMap: {
                        get: function() {
                            return t.specularMap.value
                        },
                        set: function(e) {
                            t.specularMap.value = e,
                            e ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP
                        }
                    },
                    glossiness: {
                        get: function() {
                            return t.glossiness.value
                        },
                        set: function(e) {
                            t.glossiness.value = e
                        }
                    },
                    glossinessMap: {
                        get: function() {
                            return t.glossinessMap.value
                        },
                        set: function(e) {
                            t.glossinessMap.value = e,
                            e ? (this.defines.USE_GLOSSINESSMAP = "",
                            this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP,
                            delete this.defines.USE_UV)
                        }
                    }
                }),
                delete this.metalness,
                delete this.roughness,
                delete this.metalnessMap,
                delete this.roughnessMap,
                this.setValues(e)
            }
        }
        class A {
            getMaterialType() {
                return R
            }
            extendParams(e, t, i) {
                let s = t.extensions[this.name];
                e.color = new r.Ilk(1,1,1),
                e.opacity = 1;
                let n = [];
                if (Array.isArray(s.diffuseFactor)) {
                    let o = s.diffuseFactor;
                    e.color.fromArray(o),
                    e.opacity = o[3]
                }
                if (void 0 !== s.diffuseTexture && n.push(i.assignTexture(e, "map", s.diffuseTexture, r.knz)),
                e.emissive = new r.Ilk(0,0,0),
                e.glossiness = void 0 !== s.glossinessFactor ? s.glossinessFactor : 1,
                e.specular = new r.Ilk(1,1,1),
                Array.isArray(s.specularFactor) && e.specular.fromArray(s.specularFactor),
                void 0 !== s.specularGlossinessTexture) {
                    let a = s.specularGlossinessTexture;
                    n.push(i.assignTexture(e, "glossinessMap", a)),
                    n.push(i.assignTexture(e, "specularMap", a, r.knz))
                }
                return Promise.all(n)
            }
            createMaterial(e) {
                let t = new R(e);
                return t.fog = !0,
                t.color = e.color,
                t.map = void 0 === e.map ? null : e.map,
                t.lightMap = null,
                t.lightMapIntensity = 1,
                t.aoMap = void 0 === e.aoMap ? null : e.aoMap,
                t.aoMapIntensity = 1,
                t.emissive = e.emissive,
                t.emissiveIntensity = void 0 === e.emissiveIntensity ? 1 : e.emissiveIntensity,
                t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap,
                t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap,
                t.bumpScale = 1,
                t.normalMap = void 0 === e.normalMap ? null : e.normalMap,
                t.normalMapType = r.IOt,
                e.normalScale && (t.normalScale = e.normalScale),
                t.displacementMap = null,
                t.displacementScale = 1,
                t.displacementBias = 0,
                t.specularMap = void 0 === e.specularMap ? null : e.specularMap,
                t.specular = e.specular,
                t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap,
                t.glossiness = e.glossiness,
                t.alphaMap = null,
                t.envMap = void 0 === e.envMap ? null : e.envMap,
                t.envMapIntensity = 1,
                t
            }
            constructor() {
                this.name = h.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,
                this.specularGlossinessParams = ["color", "map", "lightMap", "lightMapIntensity", "aoMap", "aoMapIntensity", "emissive", "emissiveIntensity", "emissiveMap", "bumpMap", "bumpScale", "normalMap", "normalMapType", "displacementMap", "displacementScale", "displacementBias", "specularMap", "specular", "glossinessMap", "glossiness", "alphaMap", "envMap", "envMapIntensity"]
            }
        }
        class D {
            constructor() {
                this.name = h.KHR_MESH_QUANTIZATION
            }
        }
        class k extends r._C8 {
            copySampleValue_(e) {
                let t = this.resultBuffer
                  , i = this.sampleValues
                  , s = this.valueSize
                  , n = e * s * 3 + s;
                for (let o = 0; o !== s; o++)
                    t[o] = i[n + o];
                return t
            }
            interpolate_(e, t, i, s) {
                let n = this.resultBuffer
                  , o = this.sampleValues
                  , r = this.valueSize
                  , a = 2 * r
                  , l = 3 * r
                  , h = s - t
                  , c = (i - t) / h
                  , d = c * c
                  , p = d * c
                  , u = e * l
                  , m = u - l
                  , f = -2 * p + 3 * d
                  , g = p - d
                  , v = 1 - f
                  , y = g - d + c;
                for (let x = 0; x !== r; x++) {
                    let b = o[m + x + r]
                      , S = o[m + x + a] * h
                      , w = o[u + x + r]
                      , _ = o[u + x] * h;
                    n[x] = v * b + y * S + f * w + g * _
                }
                return n
            }
            constructor(e, t, i, s) {
                super(e, t, i, s)
            }
        }
        let O = new r._fP;
        class L extends k {
            interpolate_(e, t, i, s) {
                let n = super.interpolate_(e, t, i, s);
                return O.fromArray(n).normalize().toArray(n),
                n
            }
        }
        let I = {
            FLOAT: 5126,
            FLOAT_MAT3: 35675,
            FLOAT_MAT4: 35676,
            FLOAT_VEC2: 35664,
            FLOAT_VEC3: 35665,
            FLOAT_VEC4: 35666,
            LINEAR: 9729,
            REPEAT: 10497,
            SAMPLER_2D: 35678,
            POINTS: 0,
            LINES: 1,
            LINE_LOOP: 2,
            LINE_STRIP: 3,
            TRIANGLES: 4,
            TRIANGLE_STRIP: 5,
            TRIANGLE_FAN: 6,
            UNSIGNED_BYTE: 5121,
            UNSIGNED_SHORT: 5123
        }
          , F = {
            5120: Int8Array,
            5121: Uint8Array,
            5122: Int16Array,
            5123: Uint16Array,
            5125: Uint32Array,
            5126: Float32Array
        }
          , z = {
            9728: r.TyD,
            9729: r.wem,
            9984: r.YLQ,
            9985: r.qyh,
            9986: r.aH4,
            9987: r.D1R
        }
          , U = {
            33071: r.uWy,
            33648: r.OoA,
            10497: r.rpg
        }
          , B = {
            SCALAR: 1,
            VEC2: 2,
            VEC3: 3,
            VEC4: 4,
            MAT2: 4,
            MAT3: 9,
            MAT4: 16
        }
          , G = {
            POSITION: "position",
            NORMAL: "normal",
            TANGENT: "tangent",
            TEXCOORD_0: "uv",
            TEXCOORD_1: "uv2",
            COLOR_0: "color",
            WEIGHTS_0: "skinWeight",
            JOINTS_0: "skinIndex"
        }
          , N = {
            scale: "scale",
            translation: "position",
            rotation: "quaternion",
            weights: "morphTargetInfluences"
        }
          , H = {
            CUBICSPLINE: void 0,
            LINEAR: r.NMF,
            STEP: r.Syv
        }
          , j = {
            OPAQUE: "OPAQUE",
            MASK: "MASK",
            BLEND: "BLEND"
        };
        function V(e, t, i) {
            for (let s in i.extensions)
                void 0 === e[s] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {},
                t.userData.gltfExtensions[s] = i.extensions[s])
        }
        function W(e, t) {
            void 0 !== t.extras && ("object" == typeof t.extras ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras))
        }
        function K(e) {
            let t = ""
              , i = Object.keys(e).sort();
            for (let s = 0, n = i.length; s < n; s++)
                t += i[s] + ":" + e[i[s]] + ";";
            return t
        }
        function J(e) {
            switch (e) {
            case Int8Array:
                return 1 / 127;
            case Uint8Array:
                return 1 / 255;
            case Int16Array:
                return 1 / 32767;
            case Uint16Array:
                return 1 / 65535;
            default:
                throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
            }
        }
        class Y {
            setExtensions(e) {
                this.extensions = e
            }
            setPlugins(e) {
                this.plugins = e
            }
            parse(e, t) {
                let i = this
                  , s = this.json
                  , n = this.extensions;
                this.cache.removeAll(),
                this._invokeAll(function(e) {
                    return e._markDefs && e._markDefs()
                }),
                Promise.all(this._invokeAll(function(e) {
                    return e.beforeRoot && e.beforeRoot()
                })).then(function() {
                    return Promise.all([i.getDependencies("scene"), i.getDependencies("animation"), i.getDependencies("camera")])
                }).then(function(t) {
                    let o = {
                        scene: t[0][s.scene || 0],
                        scenes: t[0],
                        animations: t[1],
                        cameras: t[2],
                        asset: s.asset,
                        parser: i,
                        userData: {}
                    };
                    V(n, o, s),
                    W(o, s),
                    Promise.all(i._invokeAll(function(e) {
                        return e.afterRoot && e.afterRoot(o)
                    })).then(function() {
                        e(o)
                    })
                }).catch(t)
            }
            _markDefs() {
                let e = this.json.nodes || []
                  , t = this.json.skins || []
                  , i = this.json.meshes || [];
                for (let s = 0, n = t.length; s < n; s++) {
                    let o = t[s].joints;
                    for (let r = 0, a = o.length; r < a; r++)
                        e[o[r]].isBone = !0
                }
                for (let l = 0, h = e.length; l < h; l++) {
                    let c = e[l];
                    void 0 !== c.mesh && (this._addNodeRef(this.meshCache, c.mesh),
                    void 0 !== c.skin && (i[c.mesh].isSkinnedMesh = !0)),
                    void 0 !== c.camera && this._addNodeRef(this.cameraCache, c.camera)
                }
            }
            _addNodeRef(e, t) {
                void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0),
                e.refs[t]++)
            }
            _getNodeRef(e, t, i) {
                if (e.refs[t] <= 1)
                    return i;
                let s = i.clone()
                  , n = (e,t)=>{
                    let i = this.associations.get(e);
                    for (let[s,o] of (null != i && this.associations.set(t, i),
                    e.children.entries()))
                        n(o, t.children[s])
                }
                ;
                return n(i, s),
                s.name += "_instance_" + e.uses[t]++,
                s
            }
            _invokeOne(e) {
                let t = Object.values(this.plugins);
                t.push(this);
                for (let i = 0; i < t.length; i++) {
                    let s = e(t[i]);
                    if (s)
                        return s
                }
                return null
            }
            _invokeAll(e) {
                let t = Object.values(this.plugins);
                t.unshift(this);
                let i = [];
                for (let s = 0; s < t.length; s++) {
                    let n = e(t[s]);
                    n && i.push(n)
                }
                return i
            }
            getDependency(e, t) {
                let i = e + ":" + t
                  , s = this.cache.get(i);
                if (!s) {
                    switch (e) {
                    case "scene":
                        s = this.loadScene(t);
                        break;
                    case "node":
                        s = this.loadNode(t);
                        break;
                    case "mesh":
                        s = this._invokeOne(function(e) {
                            return e.loadMesh && e.loadMesh(t)
                        });
                        break;
                    case "accessor":
                        s = this.loadAccessor(t);
                        break;
                    case "bufferView":
                        s = this._invokeOne(function(e) {
                            return e.loadBufferView && e.loadBufferView(t)
                        });
                        break;
                    case "buffer":
                        s = this.loadBuffer(t);
                        break;
                    case "material":
                        s = this._invokeOne(function(e) {
                            return e.loadMaterial && e.loadMaterial(t)
                        });
                        break;
                    case "texture":
                        s = this._invokeOne(function(e) {
                            return e.loadTexture && e.loadTexture(t)
                        });
                        break;
                    case "skin":
                        s = this.loadSkin(t);
                        break;
                    case "animation":
                        s = this._invokeOne(function(e) {
                            return e.loadAnimation && e.loadAnimation(t)
                        });
                        break;
                    case "camera":
                        s = this.loadCamera(t);
                        break;
                    default:
                        throw Error("Unknown type: " + e)
                    }
                    this.cache.add(i, s)
                }
                return s
            }
            getDependencies(e) {
                let t = this.cache.get(e);
                if (!t) {
                    let i = this
                      , s = this.json[e + ("mesh" === e ? "es" : "s")] || [];
                    t = Promise.all(s.map(function(t, s) {
                        return i.getDependency(e, s)
                    })),
                    this.cache.add(e, t)
                }
                return t
            }
            loadBuffer(e) {
                let t = this.json.buffers[e]
                  , i = this.fileLoader;
                if (t.type && "arraybuffer" !== t.type)
                    throw Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
                if (void 0 === t.uri && 0 === e)
                    return Promise.resolve(this.extensions[h.KHR_BINARY_GLTF].body);
                let s = this.options;
                return new Promise(function(e, n) {
                    i.load(r.Zp0.resolveURL(t.uri, s.path), e, void 0, function() {
                        n(Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'))
                    })
                }
                )
            }
            loadBufferView(e) {
                let t = this.json.bufferViews[e];
                return this.getDependency("buffer", t.buffer).then(function(e) {
                    let i = t.byteLength || 0
                      , s = t.byteOffset || 0;
                    return e.slice(s, s + i)
                })
            }
            loadAccessor(e) {
                let t = this
                  , i = this.json
                  , s = this.json.accessors[e];
                if (void 0 === s.bufferView && void 0 === s.sparse)
                    return Promise.resolve(null);
                let n = [];
                return void 0 !== s.bufferView ? n.push(this.getDependency("bufferView", s.bufferView)) : n.push(null),
                void 0 !== s.sparse && (n.push(this.getDependency("bufferView", s.sparse.indices.bufferView)),
                n.push(this.getDependency("bufferView", s.sparse.values.bufferView))),
                Promise.all(n).then(function(e) {
                    let n, o;
                    let a = e[0]
                      , l = B[s.type]
                      , h = F[s.componentType]
                      , c = h.BYTES_PER_ELEMENT
                      , d = s.byteOffset || 0
                      , p = void 0 !== s.bufferView ? i.bufferViews[s.bufferView].byteStride : void 0
                      , u = !0 === s.normalized;
                    if (p && p !== c * l) {
                        let m = Math.floor(d / p)
                          , f = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + m + ":" + s.count
                          , g = t.cache.get(f);
                        g || (n = new h(a,m * p,s.count * p / c),
                        g = new r.vpT(n,p / c),
                        t.cache.add(f, g)),
                        o = new r.kB5(g,l,d % p / c,u)
                    } else
                        n = null === a ? new h(s.count * l) : new h(a,d,s.count * l),
                        o = new r.TlE(n,l,u);
                    if (void 0 !== s.sparse) {
                        let v = B.SCALAR
                          , y = F[s.sparse.indices.componentType]
                          , x = s.sparse.indices.byteOffset || 0
                          , b = s.sparse.values.byteOffset || 0
                          , S = new y(e[1],x,s.sparse.count * v)
                          , w = new h(e[2],b,s.sparse.count * l);
                        null !== a && (o = new r.TlE(o.array.slice(),o.itemSize,o.normalized));
                        for (let _ = 0, T = S.length; _ < T; _++) {
                            let C = S[_];
                            if (o.setX(C, w[_ * l]),
                            l >= 2 && o.setY(C, w[_ * l + 1]),
                            l >= 3 && o.setZ(C, w[_ * l + 2]),
                            l >= 4 && o.setW(C, w[_ * l + 3]),
                            l >= 5)
                                throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                        }
                    }
                    return o
                })
            }
            loadTexture(e) {
                let t = this.json
                  , i = this.options
                  , s = t.textures[e]
                  , n = s.source
                  , o = t.images[n]
                  , r = this.textureLoader;
                if (o.uri) {
                    let a = i.manager.getHandler(o.uri);
                    null !== a && (r = a)
                }
                return this.loadTextureImage(e, n, r)
            }
            loadTextureImage(e, t, i) {
                let s = this
                  , n = this.json
                  , o = n.textures[e]
                  , a = n.images[t]
                  , l = (a.uri || a.bufferView) + ":" + o.sampler;
                if (this.textureCache[l])
                    return this.textureCache[l];
                let h = this.loadImageSource(t, i).then(function(t) {
                    t.flipY = !1,
                    t.name = o.name || a.name || "";
                    let i = n.samplers || {}
                      , l = i[o.sampler] || {};
                    return t.magFilter = z[l.magFilter] || r.wem,
                    t.minFilter = z[l.minFilter] || r.D1R,
                    t.wrapS = U[l.wrapS] || r.rpg,
                    t.wrapT = U[l.wrapT] || r.rpg,
                    s.associations.set(t, {
                        textures: e
                    }),
                    t
                }).catch(function() {
                    return null
                });
                return this.textureCache[l] = h,
                h
            }
            loadImageSource(e, t) {
                let i = this.json
                  , s = this.options;
                if (void 0 !== this.sourceCache[e])
                    return this.sourceCache[e].then(e=>e.clone());
                let n = i.images[e]
                  , o = self.URL || self.webkitURL
                  , a = n.uri || ""
                  , l = !1;
                if (void 0 !== n.bufferView)
                    a = this.getDependency("bufferView", n.bufferView).then(function(e) {
                        l = !0;
                        let t = new Blob([e],{
                            type: n.mimeType
                        });
                        return a = o.createObjectURL(t)
                    });
                else if (void 0 === n.uri)
                    throw Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
                let h = Promise.resolve(a).then(function(e) {
                    return new Promise(function(i, n) {
                        let o = i;
                        !0 === t.isImageBitmapLoader && (o = function(e) {
                            let t = new r.xEZ(e);
                            t.needsUpdate = !0,
                            i(t)
                        }
                        ),
                        t.load(r.Zp0.resolveURL(e, s.path), o, void 0, n)
                    }
                    )
                }).then(function(e) {
                    var t;
                    return !0 === l && o.revokeObjectURL(a),
                    e.userData.mimeType = n.mimeType || ((t = n.uri).search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/) ? "image/jpeg" : t.search(/\.webp($|\?)/i) > 0 || 0 === t.search(/^data\:image\/webp/) ? "image/webp" : "image/png"),
                    e
                }).catch(function(e) {
                    throw console.error("THREE.GLTFLoader: Couldn't load texture", a),
                    e
                });
                return this.sourceCache[e] = h,
                h
            }
            assignTexture(e, t, i, s) {
                let n = this;
                return this.getDependency("texture", i.index).then(function(o) {
                    if (void 0 === i.texCoord || 0 == i.texCoord || "aoMap" === t && 1 == i.texCoord || console.warn("THREE.GLTFLoader: Custom UV set " + i.texCoord + " for texture " + t + " not yet supported."),
                    n.extensions[h.KHR_TEXTURE_TRANSFORM]) {
                        let r = void 0 !== i.extensions ? i.extensions[h.KHR_TEXTURE_TRANSFORM] : void 0;
                        if (r) {
                            let a = n.associations.get(o);
                            o = n.extensions[h.KHR_TEXTURE_TRANSFORM].extendTexture(o, r),
                            n.associations.set(o, a)
                        }
                    }
                    return void 0 !== s && (o.encoding = s),
                    e[t] = o,
                    o
                })
            }
            assignFinalMaterial(e) {
                let t = e.geometry
                  , i = e.material
                  , s = void 0 === t.attributes.tangent
                  , n = void 0 !== t.attributes.color
                  , o = void 0 === t.attributes.normal;
                if (e.isPoints) {
                    let a = "PointsMaterial:" + i.uuid
                      , l = this.cache.get(a);
                    l || (l = new r.UY4,
                    r.F5T.prototype.copy.call(l, i),
                    l.color.copy(i.color),
                    l.map = i.map,
                    l.sizeAttenuation = !1,
                    this.cache.add(a, l)),
                    i = l
                } else if (e.isLine) {
                    let h = "LineBasicMaterial:" + i.uuid
                      , c = this.cache.get(h);
                    c || (c = new r.nls,
                    r.F5T.prototype.copy.call(c, i),
                    c.color.copy(i.color),
                    this.cache.add(h, c)),
                    i = c
                }
                if (s || n || o) {
                    let d = "ClonedMaterial:" + i.uuid + ":";
                    i.isGLTFSpecularGlossinessMaterial && (d += "specular-glossiness:"),
                    s && (d += "derivative-tangents:"),
                    n && (d += "vertex-colors:"),
                    o && (d += "flat-shading:");
                    let p = this.cache.get(d);
                    p || (p = i.clone(),
                    n && (p.vertexColors = !0),
                    o && (p.flatShading = !0),
                    s && (p.normalScale && (p.normalScale.y *= -1),
                    p.clearcoatNormalScale && (p.clearcoatNormalScale.y *= -1)),
                    this.cache.add(d, p),
                    this.associations.set(p, this.associations.get(i))),
                    i = p
                }
                i.aoMap && void 0 === t.attributes.uv2 && void 0 !== t.attributes.uv && t.setAttribute("uv2", t.attributes.uv),
                e.material = i
            }
            getMaterialType() {
                return r.Wid
            }
            loadMaterial(e) {
                let t;
                let i = this
                  , s = this.json
                  , n = this.extensions
                  , o = s.materials[e]
                  , a = {}
                  , l = o.extensions || {}
                  , c = [];
                if (l[h.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
                    let d = n[h.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
                    t = d.getMaterialType(),
                    c.push(d.extendParams(a, o, i))
                } else if (l[h.KHR_MATERIALS_UNLIT]) {
                    let p = n[h.KHR_MATERIALS_UNLIT];
                    t = p.getMaterialType(),
                    c.push(p.extendParams(a, o, i))
                } else {
                    let u = o.pbrMetallicRoughness || {};
                    if (a.color = new r.Ilk(1,1,1),
                    a.opacity = 1,
                    Array.isArray(u.baseColorFactor)) {
                        let m = u.baseColorFactor;
                        a.color.fromArray(m),
                        a.opacity = m[3]
                    }
                    void 0 !== u.baseColorTexture && c.push(i.assignTexture(a, "map", u.baseColorTexture, r.knz)),
                    a.metalness = void 0 !== u.metallicFactor ? u.metallicFactor : 1,
                    a.roughness = void 0 !== u.roughnessFactor ? u.roughnessFactor : 1,
                    void 0 !== u.metallicRoughnessTexture && (c.push(i.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)),
                    c.push(i.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))),
                    t = this._invokeOne(function(t) {
                        return t.getMaterialType && t.getMaterialType(e)
                    }),
                    c.push(Promise.all(this._invokeAll(function(t) {
                        return t.extendMaterialParams && t.extendMaterialParams(e, a)
                    })))
                }
                !0 === o.doubleSided && (a.side = r.ehD);
                let f = o.alphaMode || j.OPAQUE;
                if (f === j.BLEND ? (a.transparent = !0,
                a.depthWrite = !1) : (a.transparent = !1,
                f === j.MASK && (a.alphaTest = void 0 !== o.alphaCutoff ? o.alphaCutoff : .5)),
                void 0 !== o.normalTexture && t !== r.vBJ && (c.push(i.assignTexture(a, "normalMap", o.normalTexture)),
                a.normalScale = new r.FM8(1,1),
                void 0 !== o.normalTexture.scale)) {
                    let g = o.normalTexture.scale;
                    a.normalScale.set(g, g)
                }
                return void 0 !== o.occlusionTexture && t !== r.vBJ && (c.push(i.assignTexture(a, "aoMap", o.occlusionTexture)),
                void 0 !== o.occlusionTexture.strength && (a.aoMapIntensity = o.occlusionTexture.strength)),
                void 0 !== o.emissiveFactor && t !== r.vBJ && (a.emissive = new r.Ilk().fromArray(o.emissiveFactor)),
                void 0 !== o.emissiveTexture && t !== r.vBJ && c.push(i.assignTexture(a, "emissiveMap", o.emissiveTexture, r.knz)),
                Promise.all(c).then(function() {
                    let s;
                    return s = t === R ? n[h.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(a) : new t(a),
                    o.name && (s.name = o.name),
                    W(s, o),
                    i.associations.set(s, {
                        materials: e
                    }),
                    o.extensions && V(n, s, o),
                    s
                })
            }
            createUniqueName(e) {
                let t = r.iUV.sanitizeNodeName(e || "")
                  , i = t;
                for (let s = 1; this.nodeNamesUsed[i]; ++s)
                    i = t + "_" + s;
                return this.nodeNamesUsed[i] = !0,
                i
            }
            loadGeometries(e) {
                let t = this
                  , i = this.extensions
                  , s = this.primitiveCache
                  , n = [];
                for (let o = 0, a = e.length; o < a; o++) {
                    let l = e[o]
                      , c = function(e) {
                        let t = e.extensions && e.extensions[h.KHR_DRACO_MESH_COMPRESSION];
                        return t ? "draco:" + t.bufferView + ":" + t.indices + ":" + K(t.attributes) : e.indices + ":" + K(e.attributes) + ":" + e.mode
                    }(l)
                      , d = s[c];
                    if (d)
                        n.push(d.promise);
                    else {
                        let p;
                        p = l.extensions && l.extensions[h.KHR_DRACO_MESH_COMPRESSION] ? function(e) {
                            return i[h.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function(i) {
                                return q(i, e, t)
                            })
                        }(l) : q(new r.u9r, l, t),
                        s[c] = {
                            primitive: l,
                            promise: p
                        },
                        n.push(p)
                    }
                }
                return Promise.all(n)
            }
            loadMesh(e) {
                let t = this
                  , i = this.json
                  , s = this.extensions
                  , n = i.meshes[e]
                  , o = n.primitives
                  , a = [];
                for (let l = 0, h = o.length; l < h; l++) {
                    var c;
                    let d = void 0 === o[l].material ? (void 0 === (c = this.cache).DefaultMaterial && (c.DefaultMaterial = new r.Wid({
                        color: 16777215,
                        emissive: 0,
                        metalness: 1,
                        roughness: 1,
                        transparent: !1,
                        depthTest: !0,
                        side: r.Wl3
                    })),
                    c.DefaultMaterial) : this.getDependency("material", o[l].material);
                    a.push(d)
                }
                return a.push(t.loadGeometries(o)),
                Promise.all(a).then(function(i) {
                    let a = i.slice(0, i.length - 1)
                      , l = i[i.length - 1]
                      , h = [];
                    for (let c = 0, d = l.length; c < d; c++) {
                        let p;
                        let u = l[c]
                          , m = o[c]
                          , f = a[c];
                        if (m.mode === I.TRIANGLES || m.mode === I.TRIANGLE_STRIP || m.mode === I.TRIANGLE_FAN || void 0 === m.mode)
                            !0 !== (p = !0 === n.isSkinnedMesh ? new r.TUv(u,f) : new r.Kj0(u,f)).isSkinnedMesh || p.geometry.attributes.skinWeight.normalized || p.normalizeSkinWeights(),
                            m.mode === I.TRIANGLE_STRIP ? p.geometry = X(p.geometry, r.UlW) : m.mode === I.TRIANGLE_FAN && (p.geometry = X(p.geometry, r.z$h));
                        else if (m.mode === I.LINES)
                            p = new r.ejS(u,f);
                        else if (m.mode === I.LINE_STRIP)
                            p = new r.x12(u,f);
                        else if (m.mode === I.LINE_LOOP)
                            p = new r.blk(u,f);
                        else if (m.mode === I.POINTS)
                            p = new r.woe(u,f);
                        else
                            throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + m.mode);
                        Object.keys(p.geometry.morphAttributes).length > 0 && function(e, t) {
                            if (e.updateMorphTargets(),
                            void 0 !== t.weights)
                                for (let i = 0, s = t.weights.length; i < s; i++)
                                    e.morphTargetInfluences[i] = t.weights[i];
                            if (t.extras && Array.isArray(t.extras.targetNames)) {
                                let n = t.extras.targetNames;
                                if (e.morphTargetInfluences.length === n.length) {
                                    e.morphTargetDictionary = {};
                                    for (let o = 0, r = n.length; o < r; o++)
                                        e.morphTargetDictionary[n[o]] = o
                                } else
                                    console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
                            }
                        }(p, n),
                        p.name = t.createUniqueName(n.name || "mesh_" + e),
                        W(p, n),
                        m.extensions && V(s, p, m),
                        t.assignFinalMaterial(p),
                        h.push(p)
                    }
                    for (let g = 0, v = h.length; g < v; g++)
                        t.associations.set(h[g], {
                            meshes: e,
                            primitives: g
                        });
                    if (1 === h.length)
                        return h[0];
                    let y = new r.ZAu;
                    t.associations.set(y, {
                        meshes: e
                    });
                    for (let x = 0, b = h.length; x < b; x++)
                        y.add(h[x]);
                    return y
                })
            }
            loadCamera(e) {
                let t;
                let i = this.json.cameras[e]
                  , s = i[i.type];
                if (!s) {
                    console.warn("THREE.GLTFLoader: Missing camera parameters.");
                    return
                }
                return "perspective" === i.type ? t = new r.cPb(r.M8C.radToDeg(s.yfov),s.aspectRatio || 1,s.znear || 1,s.zfar || 2e6) : "orthographic" === i.type && (t = new r.iKG(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),
                i.name && (t.name = this.createUniqueName(i.name)),
                W(t, i),
                Promise.resolve(t)
            }
            loadSkin(e) {
                let t = this.json.skins[e]
                  , i = {
                    joints: t.joints
                };
                return void 0 === t.inverseBindMatrices ? Promise.resolve(i) : this.getDependency("accessor", t.inverseBindMatrices).then(function(e) {
                    return i.inverseBindMatrices = e,
                    i
                })
            }
            loadAnimation(e) {
                let t = this.json
                  , i = t.animations[e]
                  , s = []
                  , n = []
                  , o = []
                  , a = []
                  , l = [];
                for (let h = 0, c = i.channels.length; h < c; h++) {
                    let d = i.channels[h]
                      , p = i.samplers[d.sampler]
                      , u = d.target
                      , m = u.node
                      , f = void 0 !== i.parameters ? i.parameters[p.input] : p.input
                      , g = void 0 !== i.parameters ? i.parameters[p.output] : p.output;
                    s.push(this.getDependency("node", m)),
                    n.push(this.getDependency("accessor", f)),
                    o.push(this.getDependency("accessor", g)),
                    a.push(p),
                    l.push(u)
                }
                return Promise.all([Promise.all(s), Promise.all(n), Promise.all(o), Promise.all(a), Promise.all(l)]).then(function(t) {
                    let s = t[0]
                      , n = t[1]
                      , o = t[2]
                      , a = t[3]
                      , l = t[4]
                      , h = [];
                    for (let c = 0, d = s.length; c < d; c++) {
                        let p;
                        let u = s[c]
                          , m = n[c]
                          , f = o[c]
                          , g = a[c]
                          , v = l[c];
                        if (void 0 === u)
                            continue;
                        switch (u.updateMatrix(),
                        N[v.path]) {
                        case N.weights:
                            p = r.dUE;
                            break;
                        case N.rotation:
                            p = r.iLg;
                            break;
                        case N.position:
                        case N.scale:
                        default:
                            p = r.yC1
                        }
                        let y = u.name ? u.name : u.uuid
                          , x = void 0 !== g.interpolation ? H[g.interpolation] : r.NMF
                          , b = [];
                        N[v.path] === N.weights ? u.traverse(function(e) {
                            e.morphTargetInfluences && b.push(e.name ? e.name : e.uuid)
                        }) : b.push(y);
                        let S = f.array;
                        if (f.normalized) {
                            let w = J(S.constructor)
                              , _ = new Float32Array(S.length);
                            for (let T = 0, C = S.length; T < C; T++)
                                _[T] = S[T] * w;
                            S = _
                        }
                        for (let P = 0, E = b.length; P < E; P++) {
                            let M = new p(b[P] + "." + N[v.path],m.array,S,x);
                            "CUBICSPLINE" === g.interpolation && (M.createInterpolant = function(e) {
                                let t = this instanceof r.iLg ? L : k;
                                return new t(this.times,this.values,this.getValueSize() / 3,e)
                            }
                            ,
                            M.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0),
                            h.push(M)
                        }
                    }
                    let R = i.name ? i.name : "animation_" + e;
                    return new r.m7l(R,void 0,h)
                })
            }
            createNodeMesh(e) {
                let t = this.json
                  , i = this
                  , s = t.nodes[e];
                return void 0 === s.mesh ? null : i.getDependency("mesh", s.mesh).then(function(e) {
                    let t = i._getNodeRef(i.meshCache, s.mesh, e);
                    return void 0 !== s.weights && t.traverse(function(e) {
                        if (e.isMesh)
                            for (let t = 0, i = s.weights.length; t < i; t++)
                                e.morphTargetInfluences[t] = s.weights[t]
                    }),
                    t
                })
            }
            loadNode(e) {
                let t = this.json
                  , i = this.extensions
                  , s = this
                  , n = t.nodes[e]
                  , o = n.name ? s.createUniqueName(n.name) : "";
                return (function() {
                    let t = []
                      , i = s._invokeOne(function(t) {
                        return t.createNodeMesh && t.createNodeMesh(e)
                    });
                    return i && t.push(i),
                    void 0 !== n.camera && t.push(s.getDependency("camera", n.camera).then(function(e) {
                        return s._getNodeRef(s.cameraCache, n.camera, e)
                    })),
                    s._invokeAll(function(t) {
                        return t.createNodeAttachment && t.createNodeAttachment(e)
                    }).forEach(function(e) {
                        t.push(e)
                    }),
                    Promise.all(t)
                }
                )().then(function(t) {
                    let a;
                    if ((a = !0 === n.isBone ? new r.N$j : t.length > 1 ? new r.ZAu : 1 === t.length ? t[0] : new r.Tme) !== t[0])
                        for (let l = 0, h = t.length; l < h; l++)
                            a.add(t[l]);
                    if (n.name && (a.userData.name = n.name,
                    a.name = o),
                    W(a, n),
                    n.extensions && V(i, a, n),
                    void 0 !== n.matrix) {
                        let c = new r.yGw;
                        c.fromArray(n.matrix),
                        a.applyMatrix4(c)
                    } else
                        void 0 !== n.translation && a.position.fromArray(n.translation),
                        void 0 !== n.rotation && a.quaternion.fromArray(n.rotation),
                        void 0 !== n.scale && a.scale.fromArray(n.scale);
                    return s.associations.has(a) || s.associations.set(a, {}),
                    s.associations.get(a).nodes = e,
                    a
                })
            }
            loadScene(e) {
                let t = this.json
                  , i = this.extensions
                  , s = this.json.scenes[e]
                  , n = this
                  , o = new r.ZAu;
                s.name && (o.name = n.createUniqueName(s.name)),
                W(o, s),
                s.extensions && V(i, o, s);
                let a = s.nodes || []
                  , l = [];
                for (let h = 0, c = a.length; h < c; h++)
                    l.push(function e(t, i, s, n) {
                        let o = s.nodes[t];
                        return n.getDependency("node", t).then(function(e) {
                            let t;
                            return void 0 === o.skin ? e : n.getDependency("skin", o.skin).then(function(e) {
                                t = e;
                                let i = [];
                                for (let s = 0, o = t.joints.length; s < o; s++)
                                    i.push(n.getDependency("node", t.joints[s]));
                                return Promise.all(i)
                            }).then(function(i) {
                                return e.traverse(function(e) {
                                    if (!e.isMesh)
                                        return;
                                    let s = []
                                      , n = [];
                                    for (let o = 0, a = i.length; o < a; o++) {
                                        let l = i[o];
                                        if (l) {
                                            s.push(l);
                                            let h = new r.yGw;
                                            void 0 !== t.inverseBindMatrices && h.fromArray(t.inverseBindMatrices.array, 16 * o),
                                            n.push(h)
                                        } else
                                            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[o])
                                    }
                                    e.bind(new r.OdW(s,n), e.matrixWorld)
                                }),
                                e
                            })
                        }).then(function(t) {
                            i.add(t);
                            let r = [];
                            if (o.children) {
                                let a = o.children;
                                for (let l = 0, h = a.length; l < h; l++) {
                                    let c = a[l];
                                    r.push(e(c, t, s, n))
                                }
                            }
                            return Promise.all(r)
                        })
                    }(a[h], o, t, n));
                return Promise.all(l).then(function() {
                    return n.associations = (e=>{
                        let t = new Map;
                        for (let[i,s] of n.associations)
                            (i instanceof r.F5T || i instanceof r.xEZ) && t.set(i, s);
                        return e.traverse(e=>{
                            let i = n.associations.get(e);
                            null != i && t.set(e, i)
                        }
                        ),
                        t
                    }
                    )(o),
                    o
                })
            }
            constructor(e={}, t={}) {
                this.json = e,
                this.extensions = {},
                this.plugins = {},
                this.options = t,
                this.cache = new l,
                this.associations = new Map,
                this.primitiveCache = {},
                this.meshCache = {
                    refs: {},
                    uses: {}
                },
                this.cameraCache = {
                    refs: {},
                    uses: {}
                },
                this.lightCache = {
                    refs: {},
                    uses: {}
                },
                this.sourceCache = {},
                this.textureCache = {},
                this.nodeNamesUsed = {};
                let i = !0 === /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                  , s = navigator.userAgent.indexOf("Firefox") > -1
                  , n = s ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1;
                "undefined" == typeof createImageBitmap || i || s && n < 98 ? this.textureLoader = new r.dpR(this.options.manager) : this.textureLoader = new r.QRU(this.options.manager),
                this.textureLoader.setCrossOrigin(this.options.crossOrigin),
                this.textureLoader.setRequestHeader(this.options.requestHeader),
                this.fileLoader = new r.hH6(this.options.manager),
                this.fileLoader.setResponseType("arraybuffer"),
                "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0)
            }
        }
        function q(e, t, i) {
            let s = t.attributes
              , n = [];
            for (let o in s) {
                let a = G[o] || o.toLowerCase();
                a in e.attributes || n.push(function(t, s) {
                    return i.getDependency("accessor", t).then(function(t) {
                        e.setAttribute(s, t)
                    })
                }(s[o], a))
            }
            if (void 0 !== t.indices && !e.index) {
                let l = i.getDependency("accessor", t.indices).then(function(t) {
                    e.setIndex(t)
                });
                n.push(l)
            }
            return W(e, t),
            !function(e, t, i) {
                let s = t.attributes
                  , n = new r.ZzF;
                if (void 0 === s.POSITION)
                    return;
                {
                    let o = i.json.accessors[s.POSITION]
                      , a = o.min
                      , l = o.max;
                    if (void 0 !== a && void 0 !== l) {
                        if (n.set(new r.Pa4(a[0],a[1],a[2]), new r.Pa4(l[0],l[1],l[2])),
                        o.normalized) {
                            let h = J(F[o.componentType]);
                            n.min.multiplyScalar(h),
                            n.max.multiplyScalar(h)
                        }
                    } else {
                        console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
                        return
                    }
                }
                let c = t.targets;
                if (void 0 !== c) {
                    let d = new r.Pa4
                      , p = new r.Pa4;
                    for (let u = 0, m = c.length; u < m; u++) {
                        let f = c[u];
                        if (void 0 !== f.POSITION) {
                            let g = i.json.accessors[f.POSITION]
                              , v = g.min
                              , y = g.max;
                            if (void 0 !== v && void 0 !== y) {
                                if (p.setX(Math.max(Math.abs(v[0]), Math.abs(y[0]))),
                                p.setY(Math.max(Math.abs(v[1]), Math.abs(y[1]))),
                                p.setZ(Math.max(Math.abs(v[2]), Math.abs(y[2]))),
                                g.normalized) {
                                    let x = J(F[g.componentType]);
                                    p.multiplyScalar(x)
                                }
                                d.max(p)
                            } else
                                console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
                        }
                    }
                    n.expandByVector(d)
                }
                e.boundingBox = n;
                let b = new r.aLr;
                n.getCenter(b.center),
                b.radius = n.min.distanceTo(n.max) / 2,
                e.boundingSphere = b
            }(e, t, i),
            Promise.all(n).then(function() {
                return void 0 !== t.targets ? function(e, t, i) {
                    let s = !1
                      , n = !1
                      , o = !1;
                    for (let r = 0, a = t.length; r < a; r++) {
                        let l = t[r];
                        if (void 0 !== l.POSITION && (s = !0),
                        void 0 !== l.NORMAL && (n = !0),
                        void 0 !== l.COLOR_0 && (o = !0),
                        s && n && o)
                            break
                    }
                    if (!s && !n && !o)
                        return Promise.resolve(e);
                    let h = []
                      , c = []
                      , d = [];
                    for (let p = 0, u = t.length; p < u; p++) {
                        let m = t[p];
                        if (s) {
                            let f = void 0 !== m.POSITION ? i.getDependency("accessor", m.POSITION) : e.attributes.position;
                            h.push(f)
                        }
                        if (n) {
                            let g = void 0 !== m.NORMAL ? i.getDependency("accessor", m.NORMAL) : e.attributes.normal;
                            c.push(g)
                        }
                        if (o) {
                            let v = void 0 !== m.COLOR_0 ? i.getDependency("accessor", m.COLOR_0) : e.attributes.color;
                            d.push(v)
                        }
                    }
                    return Promise.all([Promise.all(h), Promise.all(c), Promise.all(d)]).then(function(t) {
                        let i = t[0]
                          , r = t[1]
                          , a = t[2];
                        return s && (e.morphAttributes.position = i),
                        n && (e.morphAttributes.normal = r),
                        o && (e.morphAttributes.color = a),
                        e.morphTargetsRelative = !0,
                        e
                    })
                }(e, t.targets, i) : e
            })
        }
        function X(e, t) {
            let i = e.getIndex();
            if (null === i) {
                let s = []
                  , n = e.getAttribute("position");
                if (void 0 === n)
                    return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),
                    e;
                for (let o = 0; o < n.count; o++)
                    s.push(o);
                e.setIndex(s),
                i = e.getIndex()
            }
            let a = i.count - 2
              , l = [];
            if (t === r.z$h)
                for (let h = 1; h <= a; h++)
                    l.push(i.getX(0)),
                    l.push(i.getX(h)),
                    l.push(i.getX(h + 1));
            else
                for (let c = 0; c < a; c++)
                    c % 2 == 0 ? (l.push(i.getX(c)),
                    l.push(i.getX(c + 1)),
                    l.push(i.getX(c + 2))) : (l.push(i.getX(c + 2)),
                    l.push(i.getX(c + 1)),
                    l.push(i.getX(c)));
            l.length / 3 !== a && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
            let d = e.clone();
            return d.setIndex(l),
            d
        }
        let Q = new WeakMap;
        class Z extends r.aNw {
            setTranscoderPath(e) {
                return this.transcoderPath = e,
                this
            }
            setWorkerLimit(e) {
                return this.workerLimit = e,
                this
            }
            detectSupport(e) {
                return this.workerConfig = {
                    astcSupported: e.extensions.has("WEBGL_compressed_texture_astc"),
                    etc1Supported: e.extensions.has("WEBGL_compressed_texture_etc1"),
                    etc2Supported: e.extensions.has("WEBGL_compressed_texture_etc"),
                    dxtSupported: e.extensions.has("WEBGL_compressed_texture_s3tc"),
                    bptcSupported: e.extensions.has("EXT_texture_compression_bptc"),
                    pvrtcSupported: e.extensions.has("WEBGL_compressed_texture_pvrtc") || e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
                },
                this
            }
            load(e, t, i, s) {
                let n = new r.hH6(this.manager);
                n.setResponseType("arraybuffer"),
                n.setWithCredentials(this.withCredentials);
                let o = new r.EB7;
                return n.load(e, e=>{
                    if (Q.has(e)) {
                        let i = Q.get(e);
                        return i.promise.then(t).catch(s)
                    }
                    this._createTexture([e]).then(function(e) {
                        o.copy(e),
                        o.needsUpdate = !0,
                        t && t(o)
                    }).catch(s)
                }
                , i, s),
                o
            }
            parseInternalAsync(e) {
                let {levels: t} = e
                  , i = new Set;
                for (let s = 0; s < t.length; s++)
                    i.add(t[s].data.buffer);
                return this._createTexture(Array.from(i), {
                    ...e,
                    lowLevel: !0
                })
            }
            _createTexture(e) {
                let t, i, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = 0;
                for (let o = 0; o < e.length; o++)
                    n += e[o].byteLength;
                let a = this._allocateWorker(n).then(n=>(t = n,
                i = this.workerNextTaskID++,
                new Promise((n,o)=>{
                    t._callbacks[i] = {
                        resolve: n,
                        reject: o
                    },
                    t.postMessage({
                        type: "transcode",
                        id: i,
                        buffers: e,
                        taskConfig: s
                    }, e)
                }
                ))).then(e=>{
                    let {mipmaps: t, width: i, height: s, format: n} = e
                      , o = new r.EB7(t,i,s,n,r.ywz);
                    return o.minFilter = 1 === t.length ? r.wem : r.D1R,
                    o.magFilter = r.wem,
                    o.generateMipmaps = !1,
                    o.needsUpdate = !0,
                    o
                }
                );
                return a.catch(()=>!0).then(()=>{
                    t && i && (t._taskLoad -= n,
                    delete t._callbacks[i])
                }
                ),
                Q.set(e[0], {
                    promise: a
                }),
                a
            }
            _initTranscoder() {
                if (!this.transcoderPending) {
                    let e = new r.hH6(this.manager);
                    e.setPath(this.transcoderPath),
                    e.setWithCredentials(this.withCredentials);
                    let t = new Promise((t,i)=>{
                        e.load("basis_transcoder.js", t, void 0, i)
                    }
                    )
                      , i = new r.hH6(this.manager);
                    i.setPath(this.transcoderPath),
                    i.setResponseType("arraybuffer"),
                    i.setWithCredentials(this.withCredentials);
                    let s = new Promise((e,t)=>{
                        i.load("basis_transcoder.wasm", e, void 0, t)
                    }
                    );
                    this.transcoderPending = Promise.all([t, s]).then(e=>{
                        let[t,i] = e
                          , s = Z.BasisWorker.toString()
                          , n = ["/* constants */", "let _EngineFormat = " + JSON.stringify(Z.EngineFormat), "let _TranscoderFormat = " + JSON.stringify(Z.TranscoderFormat), "let _BasisFormat = " + JSON.stringify(Z.BasisFormat), "/* basis_transcoder.js */", t, "/* worker */", s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))].join("\n");
                        this.workerSourceURL = URL.createObjectURL(new Blob([n])),
                        this.transcoderBinary = i
                    }
                    )
                }
                return this.transcoderPending
            }
            _allocateWorker(e) {
                return this._initTranscoder().then(()=>{
                    if (this.workerPool.length < this.workerLimit) {
                        let t = new Worker(this.workerSourceURL);
                        t._callbacks = {},
                        t._taskLoad = 0,
                        t.postMessage({
                            type: "init",
                            config: this.workerConfig,
                            transcoderBinary: this.transcoderBinary
                        }),
                        t.onmessage = function(e) {
                            let i = e.data;
                            switch (i.type) {
                            case "transcode":
                                t._callbacks[i.id].resolve(i);
                                break;
                            case "error":
                                t._callbacks[i.id].reject(i);
                                break;
                            default:
                                console.error('THREE.BasisTextureLoader: Unexpected message, "' + i.type + '"')
                            }
                        }
                        ,
                        this.workerPool.push(t)
                    } else
                        this.workerPool.sort(function(e, t) {
                            return e._taskLoad > t._taskLoad ? -1 : 1
                        });
                    let i = this.workerPool[this.workerPool.length - 1];
                    return i._taskLoad += e,
                    i
                }
                )
            }
            dispose() {
                for (let e = 0; e < this.workerPool.length; e++)
                    this.workerPool[e].terminate();
                return this.workerPool.length = 0,
                this
            }
            constructor(e) {
                super(e),
                this.transcoderPath = "",
                this.transcoderBinary = null,
                this.transcoderPending = null,
                this.workerLimit = 4,
                this.workerPool = [],
                this.workerNextTaskID = 1,
                this.workerSourceURL = "",
                this.workerConfig = null
            }
        }
        Z.BasisFormat = {
            ETC1S: 0,
            UASTC_4x4: 1
        },
        Z.TranscoderFormat = {
            ETC1: 0,
            ETC2: 1,
            BC1: 2,
            BC3: 3,
            BC4: 4,
            BC5: 5,
            BC7_M6_OPAQUE_ONLY: 6,
            BC7_M5: 7,
            PVRTC1_4_RGB: 8,
            PVRTC1_4_RGBA: 9,
            ASTC_4x4: 10,
            ATC_RGB: 11,
            ATC_RGBA_INTERPOLATED_ALPHA: 12,
            RGBA32: 13,
            RGB565: 14,
            BGR565: 15,
            RGBA4444: 16
        },
        Z.EngineFormat = {
            RGBAFormat: r.wk1,
            RGBA_ASTC_4x4_Format: r.ptH,
            RGBA_BPTC_Format: r.bsb,
            RGBA_ETC2_EAC_Format: r.ekQ,
            RGBA_PVRTC_4BPPV1_Format: r.eaV,
            RGBA_S3TC_DXT5_Format: r.ILR,
            RGB_ETC1_Format: r.fto,
            RGB_ETC2_Format: r.l0P,
            RGB_PVRTC_4BPPV1_Format: r._AM,
            RGB_S3TC_DXT1_Format: r.wuA
        },
        Z.BasisWorker = function() {
            let e, t, i;
            let s = _EngineFormat
              , n = _TranscoderFormat
              , o = _BasisFormat;
            onmessage = function(s) {
                let n = s.data;
                switch (n.type) {
                case "init":
                    var r;
                    e = n.config,
                    r = n.transcoderBinary,
                    t = new Promise(e=>{
                        i = {
                            wasmBinary: r,
                            onRuntimeInitialized: e
                        },
                        BASIS(i)
                    }
                    ).then(()=>{
                        i.initializeBasis()
                    }
                    );
                    break;
                case "transcode":
                    t.then(()=>{
                        try {
                            let {width: e, height: t, hasAlpha: s, mipmaps: r, format: a} = n.taskConfig.lowLevel ? function(e) {
                                let {basisFormat: t, width: s, height: n, hasAlpha: r} = e
                                  , {transcoderFormat: a, engineFormat: l} = h(t, s, n, r)
                                  , m = i.getBytesPerBlockOrPixel(a);
                                c(i.isFormatSupported(a), "THREE.BasisTextureLoader: Unsupported format.");
                                let f = [];
                                if (t === o.ETC1S) {
                                    let g = new i.LowLevelETC1SImageTranscoder
                                      , {endpointCount: v, endpointsData: y, selectorCount: x, selectorsData: b, tablesData: S} = e.globalData;
                                    try {
                                        let w;
                                        w = g.decodePalettes(v, y, x, b),
                                        c(w, "THREE.BasisTextureLoader: decodePalettes() failed."),
                                        w = g.decodeTables(S),
                                        c(w, "THREE.BasisTextureLoader: decodeTables() failed.");
                                        for (let _ = 0; _ < e.levels.length; _++) {
                                            let T = e.levels[_]
                                              , C = e.globalData.imageDescs[_]
                                              , P = u(a, T.width, T.height)
                                              , E = new Uint8Array(P);
                                            w = g.transcodeImage(a, E, P / m, T.data, d(a, T.width), p(a, T.height), T.width, T.height, T.index, C.rgbSliceByteOffset, C.rgbSliceByteLength, C.alphaSliceByteOffset, C.alphaSliceByteLength, C.imageFlags, r, !1, 0, 0),
                                            c(w, "THREE.BasisTextureLoader: transcodeImage() failed for level " + T.index + "."),
                                            f.push({
                                                data: E,
                                                width: T.width,
                                                height: T.height
                                            })
                                        }
                                    } finally {
                                        g.delete()
                                    }
                                } else
                                    for (let M = 0; M < e.levels.length; M++) {
                                        let R = e.levels[M]
                                          , A = u(a, R.width, R.height)
                                          , D = new Uint8Array(A)
                                          , k = i.transcodeUASTCImage(a, D, A / m, R.data, d(a, R.width), p(a, R.height), R.width, R.height, R.index, 0, R.data.byteLength, 0, r, !1, 0, 0, -1, -1);
                                        c(k, "THREE.BasisTextureLoader: transcodeUASTCImage() failed for level " + R.index + "."),
                                        f.push({
                                            data: D,
                                            width: R.width,
                                            height: R.height
                                        })
                                    }
                                return {
                                    width: s,
                                    height: n,
                                    hasAlpha: r,
                                    mipmaps: f,
                                    format: l
                                }
                            }(n.taskConfig) : function(e) {
                                let t = new i.BasisFile(new Uint8Array(e))
                                  , s = t.isUASTC() ? o.UASTC_4x4 : o.ETC1S
                                  , n = t.getImageWidth(0, 0)
                                  , r = t.getImageHeight(0, 0)
                                  , a = t.getNumLevels(0)
                                  , l = t.getHasAlpha();
                                function c() {
                                    t.close(),
                                    t.delete()
                                }
                                let {transcoderFormat: d, engineFormat: p} = h(s, n, r, l);
                                if (!n || !r || !a)
                                    throw c(),
                                    Error("THREE.BasisTextureLoader:	Invalid texture");
                                if (!t.startTranscoding())
                                    throw c(),
                                    Error("THREE.BasisTextureLoader: .startTranscoding failed");
                                let u = [];
                                for (let m = 0; m < a; m++) {
                                    let f = t.getImageWidth(0, m)
                                      , g = t.getImageHeight(0, m)
                                      , v = new Uint8Array(t.getImageTranscodedSizeInBytes(0, m, d))
                                      , y = t.transcodeImage(v, 0, m, d, 0, l);
                                    if (!y)
                                        throw c(),
                                        Error("THREE.BasisTextureLoader: .transcodeImage failed.");
                                    u.push({
                                        data: v,
                                        width: f,
                                        height: g
                                    })
                                }
                                return c(),
                                {
                                    width: n,
                                    height: r,
                                    hasAlpha: l,
                                    mipmaps: u,
                                    format: p
                                }
                            }(n.buffers[0])
                              , l = [];
                            for (let m = 0; m < r.length; ++m)
                                l.push(r[m].data.buffer);
                            self.postMessage({
                                type: "transcode",
                                id: n.id,
                                width: e,
                                height: t,
                                hasAlpha: s,
                                mipmaps: r,
                                format: a
                            }, l)
                        } catch (f) {
                            console.error(f),
                            self.postMessage({
                                type: "error",
                                id: n.id,
                                error: f.message
                            })
                        }
                    }
                    )
                }
            }
            ;
            let r = [{
                if: "astcSupported",
                basisFormat: [o.UASTC_4x4],
                transcoderFormat: [n.ASTC_4x4, n.ASTC_4x4],
                engineFormat: [s.RGBA_ASTC_4x4_Format, s.RGBA_ASTC_4x4_Format],
                priorityETC1S: 1 / 0,
                priorityUASTC: 1,
                needsPowerOfTwo: !1
            }, {
                if: "bptcSupported",
                basisFormat: [o.ETC1S, o.UASTC_4x4],
                transcoderFormat: [n.BC7_M5, n.BC7_M5],
                engineFormat: [s.RGBA_BPTC_Format, s.RGBA_BPTC_Format],
                priorityETC1S: 3,
                priorityUASTC: 2,
                needsPowerOfTwo: !1
            }, {
                if: "dxtSupported",
                basisFormat: [o.ETC1S, o.UASTC_4x4],
                transcoderFormat: [n.BC1, n.BC3],
                engineFormat: [s.RGB_S3TC_DXT1_Format, s.RGBA_S3TC_DXT5_Format],
                priorityETC1S: 4,
                priorityUASTC: 5,
                needsPowerOfTwo: !1
            }, {
                if: "etc2Supported",
                basisFormat: [o.ETC1S, o.UASTC_4x4],
                transcoderFormat: [n.ETC1, n.ETC2],
                engineFormat: [s.RGB_ETC2_Format, s.RGBA_ETC2_EAC_Format],
                priorityETC1S: 1,
                priorityUASTC: 3,
                needsPowerOfTwo: !1
            }, {
                if: "etc1Supported",
                basisFormat: [o.ETC1S, o.UASTC_4x4],
                transcoderFormat: [n.ETC1, n.ETC1],
                engineFormat: [s.RGB_ETC1_Format, s.RGB_ETC1_Format],
                priorityETC1S: 2,
                priorityUASTC: 4,
                needsPowerOfTwo: !1
            }, {
                if: "pvrtcSupported",
                basisFormat: [o.ETC1S, o.UASTC_4x4],
                transcoderFormat: [n.PVRTC1_4_RGB, n.PVRTC1_4_RGBA],
                engineFormat: [s.RGB_PVRTC_4BPPV1_Format, s.RGBA_PVRTC_4BPPV1_Format],
                priorityETC1S: 5,
                priorityUASTC: 6,
                needsPowerOfTwo: !0
            }]
              , a = r.sort(function(e, t) {
                return e.priorityETC1S - t.priorityETC1S
            })
              , l = r.sort(function(e, t) {
                return e.priorityUASTC - t.priorityUASTC
            });
            function h(t, i, r, h) {
                let c, d;
                let p = t === o.ETC1S ? a : l;
                for (let u = 0; u < p.length; u++) {
                    let f = p[u];
                    if (e[f.if] && f.basisFormat.includes(t) && (!f.needsPowerOfTwo || m(i) && m(r)))
                        return c = f.transcoderFormat[h ? 1 : 0],
                        d = f.engineFormat[h ? 1 : 0],
                        {
                            transcoderFormat: c,
                            engineFormat: d
                        }
                }
                return console.warn("THREE.BasisTextureLoader: No suitable compressed texture format found. Decoding to RGBA32."),
                c = n.RGBA32,
                d = s.RGBAFormat,
                {
                    transcoderFormat: c,
                    engineFormat: d
                }
            }
            function c(e, t) {
                if (!e)
                    throw Error(t)
            }
            function d(e, t) {
                return Math.ceil(t / i.getFormatBlockWidth(e))
            }
            function p(e, t) {
                return Math.ceil(t / i.getFormatBlockHeight(e))
            }
            function u(e, t, s) {
                let o = i.getBytesPerBlockOrPixel(e);
                return i.formatIsUncompressed(e) ? t * s * o : e === n.PVRTC1_4_RGB || e === n.PVRTC1_4_RGBA ? (Math.max(8, t + 3 & -4) * Math.max(8, s + 3 & -4) * 4 + 7) / 8 : d(e, t) * p(e, s) * o
            }
            function m(e) {
                return e <= 2 || (e & e - 1) == 0 && 0 !== e
            }
        }
        ;
        class $ {
            dispose() {}
            async load(e, t) {
                let i = e.length
                  , s = 0
                  , n = e.map(e=>{
                    let t;
                    switch ("string" == typeof e && (t = e.split(".").pop()),
                    t) {
                    case "jpg":
                    case "jpeg":
                    case "png":
                    case "svg":
                        return this.loadTexture(e);
                    case "glb":
                    case "gltf":
                        return this.loadGLTF(e);
                    case "json":
                        return this.loadJSON(e);
                    case "basis":
                        return this.loadBasisTexture(e)
                    }
                    return Promise.resolve()
                }
                );
                for (let o of n)
                    o.then(()=>{
                        s += 1,
                        t && t(Math.round(s / i * 100))
                    }
                    );
                return Promise.all(n).then(()=>{}
                )
            }
            loadTexture(e) {
                return new Promise((t,i)=>{
                    let s = {
                        filepath: e,
                        file: this.textureLoader.load(this.basePath + e, t, ()=>{}
                        , i)
                    };
                    this.resources.set(e, s)
                }
                )
            }
            loadBasisTexture(e) {
                return new Promise((t,i)=>{
                    let s = {
                        filepath: e,
                        file: this.basisLoader.load(this.basePath + e, t, ()=>{}
                        , i)
                    };
                    this.resources.set(e, s)
                }
                )
            }
            loadGLTF(e) {
                if (this.resources.has(e)) {
                    let t = this.resources.get(e).file;
                    return Promise.resolve(t)
                }
                return new Promise((t,i)=>{
                    this.gltfLoader.load(this.basePath + e, i=>{
                        this.resources.set(e, {
                            filepath: e,
                            file: i
                        }),
                        t(i)
                    }
                    , ()=>{}
                    , i)
                }
                )
            }
            loadJSON(e) {
                return new Promise((t,i)=>{
                    this.fileLoader.load(this.basePath + e, i=>{
                        let s = {
                            filepath: e,
                            file: JSON.parse(i)
                        };
                        this.resources.set(e, s),
                        t(s.file)
                    }
                    , ()=>{}
                    , i)
                }
                )
            }
            constructor(e, t="/") {
                this.textureLoader = new r.dpR,
                this.gltfLoader = new a,
                this.fileLoader = new r.hH6,
                this.basisLoader = new Z,
                this.resources = e,
                this.basePath = t,
                this.basisLoader.setTranscoderPath("/webgl/game/basis/").detectSupport(new r.CP7)
            }
        }
        let ee = {
            bayc: "gltf/characters/bayc.glb",
            mayc: "gltf/characters/mayc.glb",
            collectibles: "gltf/props/collectibles.glb",
            staticObstacles: "gltf/props/fixed_obstacles.glb",
            floatingObstacles: "gltf/props/floating_obstacles.glb",
            segments: "gltf/props/segments.glb",
            trashObjects: "gltf/props/objects.glb",
            threeTone: "textures/threeTone.jpg",
            bayc_basecolor: "textures/characters/bayc_basecolor.basis",
            mayc_basecolor: "textures/characters/mayc_basecolor.basis",
            bubble: "textures/vfx/bubble.png",
            flare: "textures/vfx/flare.png",
            bricks: "textures/segments/bricks.basis",
            bricksNoise: "textures/segments/bricks_noise.basis",
            segment1_ao: "textures/segments/segment1_ao.basis",
            segment2_ao: "textures/segments/segment2_ao.basis",
            segment3_ao: "textures/segments/segment3_ao.basis",
            segment4_ao: "textures/segments/segment4_ao.basis",
            segment5_ao: "textures/segments/segment5_ao.basis",
            segment6_ao: "textures/segments/segment6_ao.basis",
            segment7_ao: "textures/segments/segment7_ao.basis",
            segment1_mask: "textures/segments/segment1_mask.basis",
            segment2_mask: "textures/segments/segment2_mask.basis",
            segment3_mask: "textures/segments/segment3_mask.basis",
            segment4_mask: "textures/segments/segment4_mask.basis",
            segment5_mask: "textures/segments/segment5_mask.basis",
            segment6_mask: "textures/segments/segment6_mask.basis",
            segment7_mask: "textures/segments/segment7_mask.basis",
            spots: "textures/segments/spots.basis",
            largeSpots: "textures/segments/large_spots.basis",
            dashLines: "textures/vfx/dash_effect.png",
            dashCircle: "textures/vfx/dash_circle.png",
            trail: "textures/vfx/trail.png",
            dash_circle: "gltf/effects/dash_circle.glb",
            converging_lines: "gltf/effects/converging_lines.glb"
        };
        async function et() {
            let e = new o.Y
              , t = new $(e,"/webgl/game/");
            for (let i of Object.keys(ee)) {
                let r = ee[i]
                  , a = (0,
                s.Z)()
                  , l = "safari" === a.name;
                l && (ee[i] = r.replace(".basis", ".png"))
            }
            return n.k.logDebug("[Loader] loading resources."),
            await t.load(Object.values(ee)),
            n.k.logDebug("[Loader] resources loaded."),
            e
        }
    },
    80545: function(e, t, i) {
        i.d(t, {
            F: function() {
                return g
            }
        });
        var s = i(96995)
          , n = i(23206)
          , o = i(30823)
          , r = i(19431)
          , a = i(3361)
          , l = i(2945)
          , h = i(34551)
          , c = i(92839)
          , d = i(2064);
        class p extends s.jyz {
            setResolution(e, t) {
                this.uniforms.resolution.value.set(e, t)
            }
            update(e, t, i, s) {
                this.uniforms.offset.value += e.fixedDelta * t,
                this.uniforms.opacity.value = i,
                this.uniforms.radius.value = s
            }
            constructor(e) {
                let {resources: t, speed: i=2, opacity: n=0} = e
                  , o = (0,
                d.Hp)("dashLines", t);
                o && (o.wrapS = o.wrapT = s.rpg),
                super({
                    uniforms: {
                        resolution: {
                            value: new s.FM8(window.innerWidth,window.innerHeight)
                        },
                        tint: {
                            value: new s.Ilk(5290890)
                        },
                        map: {
                            value: o
                        },
                        offset: {
                            value: 0
                        },
                        opacity: {
                            value: n
                        },
                        radius: {
                            value: .45
                        }
                    },
                    vertexShader: "\n        uniform vec2 resolution;\n        varying vec2 vUv;\n\n        void main() {\n          vUv = uv;\n          vUv = (uv - vec2(0.5)) * vec2(resolution.x / resolution.y, 1);\n	        gl_Position = vec4(position.x, position.y, 0, 1.0);\n        }\n      ",
                    fragmentShader: "\n        uniform vec2 resolution;\n        uniform float offset;\n        uniform vec3 tint;\n        uniform float opacity;\n        uniform float radius;\n        uniform sampler2D map;\n        varying vec2 vUv;\n\n        void main() {\n          vec2 uv = vec2(0., 0.);\n          uv.x = ((atan(vUv.x, vUv.y) * 0.15915494309189533576888376337251 /* one over tau */)) + 0.5;\n          uv.y = length(vUv);\n\n          float repeat = 4.0;\n          vec2 uv1 = vec2(uv.x * repeat, uv.y + offset);\n          vec2 uv2 = vec2(uv.x * repeat + 0.5, uv.y + offset);\n\n          vec3 color = (tint * 2.5) * length(uv.y);\n          color += texture2D(map, uv1).rgb;\n          color += texture2D(map, uv2).rgb;\n\n          float smoothing = 0.35;\n          float edge0 = radius - smoothing;\n          float edge1 = radius + smoothing;\n          float alpha = smoothstep(edge0, edge1, length(uv.y));\n\n          gl_FragColor = vec4(tint * color, color * alpha * opacity);\n\n          #include <encodings_fragment>\n        }\n      "
                }),
                this.speed = i,
                this.opacity = n,
                this.transparent = !0,
                this.depthTest = !1
            }
        }
        var u = i(10469);
        class m extends u.H {
            init() {
                let e = this.args.resources
                  , t = new s.Kj0(new s._12(2,2));
                t && (t.material = new p({
                    resources: e
                }),
                this.args.mesh = t),
                super.init()
            }
            fixedUpdate(e, t) {
                var i;
                let n = null === (i = this.mesh) || void 0 === i ? void 0 : i.material
                  , o = -t.speed / 40
                  , r = c.oY.Quadratic.Out(t.dashFactor)
                  , a = window.innerWidth
                  , l = window.innerHeight
                  , h = a < l
                  , d = s.M8C.mapLinear(t.dashFactor, 0, 1, h ? .8 : 1.2, h ? .25 : .65);
                n.update(e, o, r, d),
                n.setResolution(a, l)
            }
        }
        var f = i(66896);
        class g extends f.x {
            init(e) {
                this.initPlayer(),
                e && (this.initCamera(e),
                this.initFog(e),
                this.initLights(e),
                this.initVFX(),
                this.renderer = e,
                this.renderer.getWebGLRenderer().domElement.addEventListener("webglcontextrestored", this.handleContextRestored)),
                this.showColliderHelpers && (0,
                h.DO)(this.context.entities)
            }
            dispose() {
                var e;
                null === (e = this.renderer) || void 0 === e || e.getWebGLRenderer().domElement.removeEventListener("webglcontextrestored", this.handleContextRestored)
            }
            initPlayer() {
                let e = this.context.state
                  , t = (0,
                a.M)(e.character, this.context.resources);
                t.transform.rotation.y = Math.PI,
                this.addEntity(t)
            }
            initCamera(e) {
                let t = new n.J("camera")
                  , i = new s.Pa4(0,0,7)
                  , {resources: a} = this.context;
                t.addComponent(o.w, {
                    position: i
                }),
                t.addComponent(r.V, {
                    renderer: e
                }),
                t.addComponent(m, {
                    resources: a
                }),
                this.addEntity(t)
            }
            initFog(e) {
                let t = e.getWebGLRenderer()
                  , i = e.getRenderContext();
                i.scene.fog = new s.ybr(this.fogColor,-30,125),
                t.setClearColor(this.fogColor)
            }
            initLights(e) {
                let t = e.getRenderContext()
                  , i = new s.Ox3;
                i.position.set(-25, 40, 40),
                t.scene.add(i)
            }
            initVFX() {
                let e = (0,
                l.b)(this.context.resources);
                e.transform.rotation.y = Math.PI,
                e.transform.position.z = 5,
                this.addEntity(e)
            }
            constructor(...e) {
                super(...e),
                this.fogColor = 4117863,
                this.showColliderHelpers = !1,
                this.handleContextRestored = ()=>{
                    this.renderer && this.renderer.getWebGLRenderer().setClearColor(this.fogColor)
                }
            }
        }
    },
    66896: function(e, t, i) {
        i.d(t, {
            x: function() {
                return s
            }
        });
        class s {
            dispose() {}
            init() {
                for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                    t[i] = arguments[i]
            }
            addEntity(e) {
                this.context.entities.add(e)
            }
            removeEntity(e) {
                this.context.entities.remove(e)
            }
            constructor(e) {
                this.context = e
            }
        }
    },
    21965: function(e, t, i) {
        i.d(t, {
            d: function() {
                return s
            }
        });
        class s {
            init() {}
            dispose() {}
            reset(e) {}
            update() {}
            fixedUpdate() {}
            constructor(e) {
                this.enabled = !0,
                this.context = e
            }
        }
    },
    3868: function(e, t, i) {
        i.d(t, {
            s: function() {
                return d
            }
        });
        var s = i(96995)
          , n = i(22183)
          , o = i(95464)
          , r = i(28076)
          , a = i(90070)
          , l = i(26013)
          , h = i(34551)
          , c = i(21965);
        class d extends c.d {
            init() {
                let e = this.context.components.getComponentOfType(r.J);
                this.playerColliders = e.entity.getComponentsOfType(o.Y),
                this.playerDashCollider = this.playerColliders.pop()
            }
            fixedUpdate() {
                this.updatePlayerBoundingSphere(),
                this.checkForPlayerCollisions()
            }
            updatePlayerBoundingSphere() {
                let e = this.context.components.getComponentOfType(r.J);
                this.playerBoundingSphere.center.copy(e.entity.transform.position)
            }
            checkForPlayerCollisions() {
                let e = this.context.components.getComponentsOfType(o.Y);
                e && e.forEachComponent(e=>{
                    var t, i, s, n;
                    e.enabled && (null === (t = this.playerColliders) || void 0 === t ? void 0 : t.length) && !(null === (i = this.playerColliders) || void 0 === i ? void 0 : i.includes(e)) && e !== this.playerDashCollider && e.intersectsSphere(this.playerBoundingSphere) && function(e, t) {
                        let i = !1;
                        if (e instanceof l.D)
                            for (let s of t)
                                s instanceof l.D && s.obb.intersectsOBB(e.obb) && (i = !0),
                                s instanceof a.B && e.obb.intersectsSphere(s.sphere) && (i = !0);
                        if (e instanceof a.B)
                            for (let n of t)
                                n instanceof l.D && n.obb.intersectsSphere(e.sphere) && (i = !0),
                                n instanceof a.B && n.sphere.intersectsSphere(e.sphere) && (i = !0);
                        return i
                    }(e, this.playerColliders) && ((0,
                    h.lO)(e.entity),
                    this.handlePlayerCollision(e.entity)),
                    this.playerDashCollider && (null === (s = this.playerColliders) || void 0 === s ? void 0 : s.length) && !(null === (n = this.playerColliders) || void 0 === n ? void 0 : n.includes(e)) && e !== this.playerDashCollider && e.intersectsOBB(this.playerDashCollider.obb) && this.handlePlayerDashCollision(e.entity)
                }
                )
            }
            handlePlayerCollision(e) {
                this.onPlayerCollision.emit(e)
            }
            handlePlayerDashCollision(e) {
                this.onPlayerDashCollision.emit(e)
            }
            constructor(...e) {
                super(...e),
                this.onPlayerCollision = new n.M,
                this.onPlayerDashCollision = new n.M,
                this.playerColliders = [],
                this.playerBoundingSphere = new s.aLr(new s.Pa4,1)
            }
        }
    },
    45567: function(e, t, i) {
        i.d(t, {
            d: function() {
                return n
            }
        });
        var s = i(21965);
        class n extends s.d {
            update() {
                let e = this.context.components.getAllComponents()
                  , {time: t, state: i} = this.context;
                e.forEachComponent(e=>{
                    e.enabled && e.update(t, i)
                }
                )
            }
            fixedUpdate() {
                let e = this.context.components.getAllComponents()
                  , {time: t, state: i} = this.context;
                e.forEachComponent(e=>{
                    e.enabled && e.fixedUpdate(t, i)
                }
                )
            }
        }
    },
    82115: function(e, t, i) {
        i.d(t, {
            z: function() {
                return d
            }
        });
        var s = i(22183)
          , n = i(34871)
          , o = i(84045)
          , r = i(55286)
          , a = i(18297)
          , l = i(3005)
          , h = i(45658)
          , c = i(34406);
        class d extends h.F {
            handleCollisionWithLethalObstacle(e) {
                o.k.logDebug("Player collided with ".concat(e.uuid)),
                "true" === c.env.NEXT_PUBLIC_DEBUG_SEED && console.log("Seed: ".concat(this.context.getSeed())),
                this.onPlayerDeath.emit(),
                this.onGameOver.emit()
            }
            handlePlayerDestroyObstacle(e) {
                let t = (0,
                r.Xx)(this.state);
                this.state.destructionPoints += t,
                this.onBonusPoints.emit(t),
                this.updateScore(),
                this.state.stats.obstacles.destroyedCount += 1,
                super.handlePlayerDestroyObstacle(e)
            }
            handlePlayerCollectItem(e) {
                let t = e.getComponent(n.b)
                  , {id: i, rarity: s} = t;
                if (i) {
                    let l = (0,
                    r.xX)(this.state, s);
                    this.state.collectiblePoints += l,
                    this.onBonusPoints.emit(l),
                    this.updateScore(),
                    o.k.logDebug("Player picked up ".concat(i)),
                    o.k.logDebug("Collectible rarity: ".concat(s)),
                    this.state.collectibles.total += 1,
                    this.state.collectibles[s] += 1,
                    this.state.stats.itemsByRarity[s].collectedCount += 1,
                    Object.prototype.hasOwnProperty.call(this.state.collectedItems, i) || (this.state.collectedItems[i] = {
                        count: 0,
                        rarity: a.a4[i]
                    }),
                    this.state.collectedItems[i].count += 1
                }
                super.handlePlayerCollectItem(e)
            }
            handleCollectBonus() {
                this.state.stats.bonusItems.collectedCount += 1,
                this.state.basePoints += 1,
                this.updateScore()
            }
            updateScore() {
                this.state.score = Math.round((this.state.basePoints + this.state.destructionPoints + this.state.collectiblePoints) * this.state.scoreMultiplier),
                this.isCountDownOver() && this.onScoreChange.emit(this.state.score)
            }
            updateSpeed() {
                let e = (0,
                r.IW)(this.state.fixedUpdateElapsedTime)
                  , t = l.P2 * this.state.dashFactor;
                this.state.speed = (e + t) * this.state.globalSpeedFactor
            }
            fixedUpdate() {
                this.isCountDownOver() && (this.state.basePoints += (0,
                r.Xs)(this.state, this.context.time.fixedDelta),
                this.updateScore()),
                this.updateSpeed(),
                this.state.gameModeStarted || (this.state.gameModeStarted = !0,
                this.onGameStart.emit())
            }
            isCountDownOver() {
                return this.state.fixedUpdateElapsedTime > l.iG
            }
            constructor(...e) {
                super(...e),
                this.onPlayerDeath = new s.M,
                this.onGameStart = new s.M,
                this.onGameOver = new s.M,
                this.onScoreChange = new s.M,
                this.onBonusPoints = new s.M
            }
        }
    },
    80899: function(e, t, i) {
        i.d(t, {
            $: function() {
                return n
            }
        });
        var s = i(21965);
        class n extends s.d {
            dispose() {
                this.entries.length = 0
            }
            saveCurrentState() {
                let {inputs: e} = this.state
                  , t = [e.normalizedPointerX, e.normalizedPointerY];
                this.entries.push({
                    coords: t,
                    clicked: e.clicked
                })
            }
            getEntries() {
                return this.entries
            }
            fixedUpdate() {
                this.saveCurrentState()
            }
            constructor(e) {
                super(e),
                this.state = this.context.state,
                this.entries = []
            }
        }
    },
    16602: function(e, t, i) {
        i.d(t, {
            H: function() {
                return o
            }
        });
        var s = i(24423)
          , n = i(21965);
        class o extends n.d {
            fixedUpdate() {
                let e = this.context.state;
                if (e.mode === s.GF.Game && this.entryIndex < this.history.length) {
                    let t = this.history[this.entryIndex];
                    this.inputs.normalizedPointerX = t.coords[0],
                    this.inputs.normalizedPointerY = t.coords[1],
                    this.inputs.clicked = t.clicked,
                    this.entryIndex += 1
                }
            }
            constructor(e, t) {
                super(e),
                this.entryIndex = 0,
                this.history = t,
                this.inputs = this.context.state.inputs
            }
        }
    },
    5274: function(e, t, i) {
        i.d(t, {
            E: function() {
                return a
            }
        });
        var s = i(96995)
          , n = i(95905)
          , o = i(21434)
          , r = i(21965);
        class a extends r.d {
            dispose() {
                window.removeEventListener("mousemove", this.handleMouseMove),
                window.removeEventListener("touchstart", this.handleTouchStart),
                window.removeEventListener("touchmove", this.handleTouchMove),
                window.removeEventListener("click", this.handleClick),
                document.removeEventListener("pointerlockchange", this.handlePointerLockChange)
            }
            updateNormalizedPointerRelative() {
                let {inputs: e} = this.state
                  , t = window.innerHeight
                  , i = 1 / (t / 2)
                  , s = this.normalizedPointer.x + e.movementX * i
                  , o = this.normalizedPointer.y + -(e.movementY * i * 1);
                s = (0,
                n.s)(s),
                o = (0,
                n.s)(o),
                this.normalizedPointer.set(s, o)
            }
            updateNormalizedPointerAbsolute() {
                let {inputs: e} = this.state
                  , t = window.innerWidth
                  , i = window.innerHeight
                  , {pointerX: o} = e
                  , {pointerY: r} = e
                  , a = t / i
                  , l = s.M8C.clamp(s.M8C.mapLinear(o, 0, t, -a, a), -1, 1)
                  , h = s.M8C.mapLinear(r, 0, i, 1, -1);
                l = (0,
                n.s)(l),
                h = (0,
                n.s)(h),
                this.normalizedPointer.set(l, h)
            }
            updateNormalizedPointer() {
                this.pointerLocked ? this.updateNormalizedPointerRelative() : this.updateNormalizedPointerAbsolute(),
                this.normalizedPointer.clampLength(0, 1)
            }
            updateNormalizedPointerState() {
                let {inputs: e} = this.state;
                e.normalizedPointerX = (0,
                o.oV)(this.normalizedPointer.x),
                e.normalizedPointerY = (0,
                o.oV)(this.normalizedPointer.y)
            }
            updateClickedState() {
                this.state.inputs.clicked && (this.fixedUpdateCountSinceClick += 1,
                this.fixedUpdateCountSinceClick > 1 && (this.state.inputs.clicked = !1,
                this.fixedUpdateCountSinceClick = 0))
            }
            fixedUpdate() {
                this.updateNormalizedPointerState(),
                this.updateClickedState()
            }
            constructor(e) {
                super(e),
                this.pointerLocked = null !== document.pointerLockElement,
                this.normalizedPointer = new s.FM8,
                this.lastTouchPosition = new s.FM8,
                this.fixedUpdateCountSinceClick = 0,
                this.TOUCH_MOVE_SPEED = .01,
                this.isTouchDevice = (0,
                n.t)(),
                this.handleMouseMove = e=>{
                    this.isTouchDevice || (this.state.inputs.pointerX = e.clientX,
                    this.state.inputs.pointerY = e.clientY,
                    this.state.inputs.movementX = e.movementX,
                    this.state.inputs.movementY = e.movementY,
                    this.updateNormalizedPointer())
                }
                ,
                this.handleTouchStart = e=>{
                    this.isTouchDevice = !0,
                    this.lastTouchPosition.set(e.touches[0].clientX, e.touches[0].clientY)
                }
                ,
                this.handleTouchMove = e=>{
                    let t = e.touches[0].clientX
                      , i = e.touches[0].clientY
                      , s = t - this.lastTouchPosition.x
                      , o = i - this.lastTouchPosition.y
                      , r = this.TOUCH_MOVE_SPEED
                      , a = this.normalizedPointer.x + s * r
                      , l = this.normalizedPointer.y + -(o * r * 1);
                    a = (0,
                    n.s)(a),
                    l = (0,
                    n.s)(l),
                    this.normalizedPointer.set(a, l),
                    this.normalizedPointer.clampLength(0, 1),
                    this.lastTouchPosition.set(t, i)
                }
                ,
                this.handleClick = e=>{
                    (void 0 === e.button || 0 === e.button) && (this.state.inputs.clicked = !0)
                }
                ,
                this.handlePointerLockChange = ()=>{
                    this.pointerLocked = !!document.pointerLockElement
                }
                ,
                this.state = this.context.state,
                window.addEventListener("mousemove", this.handleMouseMove),
                window.addEventListener("touchstart", this.handleTouchStart),
                window.addEventListener("touchmove", this.handleTouchMove),
                window.addEventListener("click", this.handleClick),
                document.addEventListener("pointerlockchange", this.handlePointerLockChange)
            }
        }
    },
    45658: function(e, t, i) {
        i.d(t, {
            F: function() {
                return m
            }
        });
        var s = i(22183)
          , n = i(18297)
          , o = i(33442)
          , r = i(73008)
          , a = i(34871)
          , l = i(39123)
          , h = i(60400)
          , c = i(60462)
          , d = i(6268)
          , p = i(21965)
          , u = i(3868);
        class m extends p.d {
            init() {
                this.collisionSystem = this.context.systems.getSystemOfType(u.s),
                this.collisionSystem.onPlayerCollision.add(this.handlePlayerCollision),
                this.collisionSystem.onPlayerDashCollision.add(this.handlePlayerDashCollision)
            }
            dispose() {
                var e, t;
                null === (e = this.collisionSystem) || void 0 === e || e.onPlayerCollision.remove(this.handlePlayerCollision),
                null === (t = this.collisionSystem) || void 0 === t || t.onPlayerDashCollision.remove(this.handlePlayerDashCollision)
            }
            handleCollisionWithLethalObstacle(e) {}
            handlePlayerDestroyObstacle(e) {
                let t = e.getComponentsOfType(c.M)
                  , i = e.getComponent(r.b);
                if (!i)
                    for (let s of t)
                        s.enabled = !1;
                this.onPlayerDestroyObstacle.emit(e.name)
            }
            handlePlayerCollectItem(e) {
                let t = this.context.components.getComponentOfType(d.g)
                  , i = e.getComponent(a.b)
                  , {id: s, rarity: o} = i
                  , r = n.u9.get(o)
                  , l = e.getComponentsOfType(c.M);
                for (let h of l)
                    h.enabled = !1;
                s && this.onPickupCollectible.emit(s),
                t && t.animate(this.state.fixedUpdateElapsedTime, r.color)
            }
            handleCollisionWithDeflector(e) {
                this.onPlayerDeflection.emit(e)
            }
            handleCollisionWithPushable(e) {
                let t = e.getComponent(r.b)
                  , i = e.getComponent(h.i);
                i && (i.enabled = !1),
                t.applyImpact(this.state),
                this.onCollisionWithObject.emit()
            }
            handleCollectBonus() {}
            constructor(e) {
                super(e),
                this.onCollisionWithObject = new s.M,
                this.onPickupCollectible = new s.M,
                this.onPlayerDestroyObstacle = new s.M,
                this.onPlayerDeflection = new s.M,
                this.handlePlayerCollision = e=>{
                    if (!this.enabled)
                        return;
                    let t = e.hasComponent(o.J)
                      , i = t && e.getComponent(o.J).id
                      , s = e.hasComponent(a.b)
                      , h = i && n.P.includes(i)
                      , c = n.Y_.includes(e.name)
                      , d = e.hasComponent(l._)
                      , p = this.context.state
                      , u = e.getComponent(r.b)
                      , m = !1;
                    s && this.handlePlayerCollectItem(e),
                    t && (p.dashing ? h && (this.handleCollisionWithLethalObstacle(e),
                    m = !0) : d ? this.handleCollisionWithDeflector(e) : (this.handleCollisionWithLethalObstacle(e),
                    m = !0)),
                    u && !m && this.handleCollisionWithPushable(e),
                    c && this.handleCollectBonus()
                }
                ,
                this.handlePlayerDashCollision = e=>{
                    if (!this.enabled)
                        return;
                    let t = e.hasComponent(o.J)
                      , i = e.getComponent(o.J)
                      , s = t && i.id
                      , r = s && n.P.includes(s)
                      , a = this.context.state;
                    t && a.dashing && !r && !i.destroyed && (i.destroyed = !0,
                    this.handlePlayerDestroyObstacle(e))
                }
                ,
                this.state = this.context.state
            }
        }
    },
    84681: function(e, t, i) {
        i.d(t, {
            b: function() {
                return f
            }
        });
        var s = i(92839)
          , n = i(96995)
          , o = i(22183)
          , r = i(19431)
          , a = i(28076)
          , l = i(55286)
          , h = i(93944)
          , c = i(95905)
          , d = i(3005)
          , p = i(21434)
          , u = i(21965)
          , m = i(82115);
        class f extends u.d {
            get dashCooldown() {
                return this.state.gameVars.dashRefillDuration
            }
            get dashCooldownProgress() {
                return Math.min((this.state.fixedUpdateElapsedTime - this.dash.lastTime) / this.dashCooldown, 1)
            }
            init() {
                this.gameModeSystem = this.context.systems.getSystemOfType(m.z),
                this.gameModeSystem.onPlayerDestroyObstacle.add(this.handleDestroyObstacle),
                this.gameModeSystem.onPlayerDeflection.add(this.handlePlayerDeflection)
            }
            dispose() {
                var e, t;
                null === (e = this.gameModeSystem) || void 0 === e || e.onPlayerDestroyObstacle.remove(this.handleDestroyObstacle),
                null === (t = this.gameModeSystem) || void 0 === t || t.onPlayerDeflection.remove(this.handlePlayerDeflection)
            }
            fixedUpdate() {
                this.state.fixedUpdateElapsedTime > d.iG && (this.updateState(),
                this.updateTargetPosition(),
                this.applyDeflection(),
                this.updatePlayerTransform(),
                this.updateCamera(),
                this.state.inputs.clicked && this.startDashing())
            }
            initTimelines() {
                this.speedTimeline = new h.v(this.dash,()=>this.state.fixedUpdateElapsedTime),
                this.speedTimeline.to({
                    speedFactor: 1,
                    strafeFactor: this.DASH_STRAFE_FACTOR
                }, this.DASH_SPEEDUP_DURATION, s.oY.Quadratic.InOut).to({
                    cruiseProgress: 1
                }, this.DASH_MAXSPEED_DURATION).to({
                    speedFactor: 0,
                    strafeFactor: 1,
                    cruiseProgress: 0
                }, this.DASH_SLOWDOWN_DURATION).onUpdate(()=>{
                    this.dash.strafeFactor = (0,
                    c.s)(this.dash.strafeFactor),
                    this.dash.speedFactor = (0,
                    c.s)(this.dash.speedFactor),
                    this.dash.cruiseProgress = (0,
                    c.s)(this.dash.cruiseProgress)
                }
                ).onComplete(()=>{
                    this.handleDashComplete()
                }
                ),
                this.cameraTimeline = new h.v(this.dash,()=>this.state.fixedUpdateElapsedTime),
                this.cameraTimeline.to({
                    cameraOffset: this.DASH_CAMERA_OFFSET,
                    fovOffset: this.DASH_FOV_BOOST
                }, this.DASH_SPEEDUP_DURATION + this.DASH_MAXSPEED_DURATION, s.oY.Exponential.Out).to({
                    cameraOffset: 0,
                    fovOffset: 0
                }, 3 * this.DASH_SLOWDOWN_DURATION, s.oY.Sinusoidal.InOut),
                this.deflectionTimeline = new h.v(this.deflection,()=>this.state.fixedUpdateElapsedTime),
                this.deflectionTimeline.to({
                    speed: 0
                }, 1, s.oY.Quadratic.Out).onUpdate(()=>{
                    this.deflection.velocity.setLength(this.deflection.speed)
                }
                )
            }
            startDashing() {
                let e = this.state.fixedUpdateElapsedTime;
                if (this.state.dashAvailable) {
                    var t, i;
                    this.dash.inProgress = !0,
                    this.dash.lastTime = e,
                    this.state.dashing = !0,
                    this.state.dashAvailable = !1,
                    this.onDashAvailabilityChange.emit(!1),
                    this.onDash.emit(),
                    null === (t = this.speedTimeline) || void 0 === t || t.reset().start(),
                    null === (i = this.cameraTimeline) || void 0 === i || i.reset().start()
                }
            }
            updateTargetPosition() {
                this.targetPosition.set((0,
                p.Hq)(this.state.inputs.normalizedPointerX), (0,
                p.Hq)(this.state.inputs.normalizedPointerY)),
                this.dampedTargetPosition.lerp(this.targetPosition, Math.min(this.STRAFE_SPEED * this.dash.strafeFactor * this.context.time.fixedDelta, 1)),
                this.lookTargetPosition2D.lerp(this.targetPosition, Math.min(this.ROTATION_SPEED * this.context.time.fixedDelta, 1))
            }
            applyDeflection() {
                this.targetPosition.add(this.deflection.velocity),
                this.dampedTargetPosition.add(this.deflection.velocity),
                this.lookTargetPosition2D.add(this.deflection.velocity),
                this.targetPosition.clampLength(0, 1),
                this.dampedTargetPosition.clampLength(0, 1),
                this.lookTargetPosition2D.clampLength(0, 1)
            }
            updateCamera() {
                let e = this.context.components.getComponentOfType(r.V);
                if (e) {
                    let {transform: t} = e.entity;
                    t.position.set(this.dampedTargetPosition.x * this.MOVEMENT_RADIUS / 2.5, this.dampedTargetPosition.y * this.MOVEMENT_RADIUS / 2.5, this.CAMERA_DISTANCE + this.dash.cameraOffset),
                    e.setFov(60 + this.dash.fovOffset)
                }
            }
            updatePlayerTransform() {
                let e = this.context.components.getComponentOfType(a.J);
                if (e) {
                    let {transform: t} = e.entity;
                    t.position.set(this.dampedTargetPosition.x * this.MOVEMENT_RADIUS, this.dampedTargetPosition.y * this.MOVEMENT_RADIUS, t.position.z),
                    this.lookTargetPosition3D.set(this.lookTargetPosition2D.x * this.MOVEMENT_RADIUS, this.lookTargetPosition2D.y * this.MOVEMENT_RADIUS, -4 + -16 * (1 - this.dash.strafeFactor)),
                    t.getObject3D().lookAt(this.lookTargetPosition3D),
                    this.state.playerPosition.copy(t.position)
                }
            }
            isDashAvailable() {
                return this.state.fixedUpdateElapsedTime - this.dash.lastTime > this.dashCooldown
            }
            updateState() {
                this.isDashAvailable() && (this.state.dashAvailable || this.onDashAvailabilityChange.emit(!0),
                this.state.dashAvailable = !0),
                this.state.dashFactor = this.dash.speedFactor,
                this.state.dashing = this.dash.inProgress,
                this.state.dashCooldownProgress = this.dashCooldownProgress
            }
            constructor(e) {
                super(e),
                this.onDash = new o.M,
                this.onDashAvailabilityChange = new o.M,
                this.targetPosition = new n.FM8,
                this.dampedTargetPosition = new n.FM8,
                this.lookTargetPosition2D = new n.FM8,
                this.lookTargetPosition3D = new n.Pa4,
                this.MOVEMENT_RADIUS = 4.25,
                this.STRAFE_SPEED = 3,
                this.ROTATION_SPEED = 10,
                this.CAMERA_DISTANCE = 7,
                this.DASH_SPEEDUP_DURATION = .025,
                this.DASH_MAXSPEED_DURATION = .25,
                this.DASH_SLOWDOWN_DURATION = .3,
                this.DASH_STRAFE_FACTOR = .25,
                this.DASH_FOV_BOOST = 20,
                this.DASH_CAMERA_OFFSET = 1,
                this.dash = {
                    inProgress: !1,
                    lastTime: Number.NEGATIVE_INFINITY,
                    speedFactor: 0,
                    fovOffset: 0,
                    cameraOffset: 0,
                    elapsedTime: 0,
                    strafeFactor: 1,
                    cruiseProgress: 0
                },
                this.deflection = {
                    playerPos2D: new n.FM8,
                    deflectorPos2D: new n.FM8,
                    velocity: new n.FM8,
                    speed: 0
                },
                this.handlePlayerDeflection = e=>{
                    var t;
                    let i = this.context.components.getComponentOfType(a.J)
                      , s = (0,
                    l.Er)(e);
                    this.deflection.playerPos2D.set(i.entity.transform.position.x, i.entity.transform.position.y),
                    this.deflection.deflectorPos2D.set(e.transform.position.x, e.transform.position.y),
                    this.deflection.velocity.subVectors(this.deflection.playerPos2D, this.deflection.deflectorPos2D).setLength(s),
                    this.deflection.speed = s,
                    null === (t = this.deflectionTimeline) || void 0 === t || t.reset().start()
                }
                ,
                this.handleDestroyObstacle = ()=>{
                    this.dash.lastTime = 0
                }
                ,
                this.handleDashComplete = ()=>{
                    this.dash.inProgress = !1,
                    this.state.dashing = !1
                }
                ,
                this.state = this.context.state,
                this.initTimelines()
            }
        }
    },
    21043: function(e, t, i) {
        i.d(t, {
            t: function() {
                return R
            }
        });
        var s = i(96995)
          , n = i(95905);
        class o {
            get length() {
                return this.items.length
            }
            push(e) {
                return this.items.push(e)
            }
            shift() {
                return this.items.shift()
            }
            empty() {
                this.items.length = 0
            }
            constructor() {
                this.items = []
            }
        }
        var r = i(26013)
          , a = i(56459)
          , l = i(90070)
          , h = i(9675)
          , c = i(72016)
          , d = i(18297)
          , p = i(3005)
          , u = i(24423)
          , m = i(55286)
          , f = i(27172)
          , g = JSON.parse('{"chunk1":{"static":[{"id":"grid","position":[0,0,-24.21402931213379],"rotation":[0,0,-3.497040033340454]},{"id":"pipe2","position":[-4.461329936981201,5.393184661865234,-42.463279724121094],"rotation":[-4.2905679720206535e-7,-2.7886721909453627e-7,-2.040520668029785]},{"id":"segment1","position":[0,0,-25],"rotation":[0,0,0]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-6.501430511474609]},{"position":[3.096832752227783,-2.152177333831787,-6.501430511474609]},{"position":[0.032056450843811035,2.3259851932525635,-8.578103065490723]},{"position":[-3.6777877807617188,0.2887909412384033,-12.631071090698242]},{"position":[0.6679723262786865,-3.7116105556488037,-12.631071090698242]},{"position":[1.525851845741272,1.4805172681808472,-12.631070137023926]},{"position":[-2.3963825702667236,2.8047945499420166,-20.296663284301758]},{"position":[-2.152177333831787,-3.096832752227783,-20.296663284301758]},{"position":[2.125823974609375,-0.032056331634521484,-20.296663284301758]},{"position":[0.2887909412384033,2.855783462524414,-27.098634719848633]},{"position":[-3.7116105556488037,-1.4899765253067017,-27.098634719848633]},{"position":[1.4805172681808472,-2.347856044769287,-27.098634719848633]},{"position":[-3.6777877807617188,0.2887909412384033,-31.721708297729492]},{"position":[0.6679723262786865,-3.7116105556488037,-31.721708297729492]},{"position":[1.525851845741272,1.4805172681808472,-31.72170639038086]},{"position":[-2.3963825702667236,2.8047945499420166,-39.387298583984375]},{"position":[-2.152177333831787,-3.0217723846435547,-37.36066436767578]},{"position":[2.125823974609375,-0.032056331634521484,-39.387298583984375]},{"position":[0.2887909412384033,2.855783462524414,-46.18927001953125]},{"position":[-3.7116105556488037,-0.21394824981689453,-45.338584899902344]},{"position":[1.4805172681808472,-2.347856044769287,-46.18927001953125]}],"collectibles":[{"position":[-1.880051851272583,1.3040330410003662,-34.903106689453125]},{"position":[2.8206844329833984,1.8283812999725342,-3.8855032920837402]}]},"chunk2":{"static":[{"id":"pipe3","position":[0.05931776762008667,-6.0698771476745605,-32.836463928222656],"rotation":[0,0,0]},{"id":"pipe3","position":[-5.786315441131592,-1.2545080184936523,-16.192209243774414],"rotation":[-1.2239645719528198,-1.395148515701294,-1.5416280031204224]},{"id":"segment2","position":[0,0,-25],"rotation":[0,0,0]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[0.032056450843811035,2.125823974609375,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-18.61194610595703]},{"position":[-2.152177333831787,-3.096832752227783,-18.61194610595703]},{"position":[2.125823974609375,-0.032056331634521484,-18.61194610595703]},{"position":[0.2887909412384033,2.855783462524414,-25.413917541503906]},{"position":[-3.7116105556488037,-1.4899765253067017,-25.413917541503906]},{"position":[-3.6777877807617188,0.2887909412384033,-30.036991119384766]},{"position":[0.6679723262786865,-3.7116105556488037,-30.036991119384766]},{"position":[1.525851845741272,1.4805172681808472,-30.036989212036133]},{"position":[-2.3963825702667236,2.8047945499420166,-37.702579498291016]},{"position":[-2.152177333831787,-3.096832752227783,-37.702579498291016]},{"position":[2.125823974609375,-0.032056331634521484,-37.702579498291016]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[1.2900265455245972,-3.6806533336639404,-33.348106384277344]},{"position":[-2.3128767013549805,1.3483989238739014,-7.556392192840576]}]},"chunk3":{"static":[{"id":"segment3","position":[0,0,-25],"rotation":[0,0,0]},[{"id":"wood","position":[-1.050567865371704,2.1840953826904297,-36.392879486083984],"rotation":[6.632251370319864e-7,7.605468681504135e-7,-1.3952267169952393]},{"id":"wood2","position":[3.0598907470703125,0.07773891091346741,-36.62469482421875],"rotation":[-4.554046881821705e-7,-2.9157874337215617e-7,-2.002593517303467]},{"id":"wood2","position":[-3.4516143798828125,2.560446262359619,-36.62469482421875],"rotation":[-5.575861337092647e-7,-4.013340060282644e-7,-1.8938490152359009]},{"id":"wood3","position":[1.3398197889328003,2.886107921600342,-36.62469482421875],"rotation":[1.6137192693221891e-9,-2.0886339768821927e-8,0.15421755611896515]}],{"id":"pipe","position":[4.520758628845215,-4.347105979919434,-16.825071334838867],"rotation":[0.27968844771385193,-2.826401948928833,-1.0776973962783813]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[-1.0546574592590332,1.4908900260925293,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-18.61194610595703]},{"position":[-2.152177333831787,-3.096832752227783,-18.61194610595703]},{"position":[2.1136136054992676,-0.3373130261898041,-18.61194610595703]},{"position":[0.2887909412384033,2.855783462524414,-38.80569839477539]},{"position":[-2.917943000793457,-1.1236685514450073,-25.413917541503906]},{"position":[0.0030747652053833008,-1.957127571105957,-25.413917541503906]},{"position":[-3.6777877807617188,0.2887909412384033,-30.036991119384766]},{"position":[0.6679723262786865,-3.7116105556488037,-30.036991119384766]},{"position":[1.525851845741272,-0.44658124446868896,-33.82372283935547]},{"position":[-0.21074438095092773,-0.6140584945678711,-37.702579498291016]},{"position":[-2.152177333831787,-3.096832752227783,-37.702579498291016]},{"position":[2.125823974609375,-0.032056331634521484,-41.1500358581543]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[2.5504143238067627,2.355611801147461,-28.987380981445312]},{"position":[-1.2721104621887207,1.679425597190857,-11.553731918334961]}]},"chunk4":{"static":[{"id":"segment4","position":[0,0,-25],"rotation":[0,0,0]},[{"id":"wood","position":[2.9228453636169434,2.613133430480957,-27.45429229736328],"rotation":[6.622163368774636e-7,-7.851622285670601e-7,1.401315450668335]},{"id":"wood","position":[4.50727653503418,3.536510467529297,-27.45429229736328],"rotation":[9.602505315342569e-7,-0.0000010863324177989853,1.4477401971817017]},{"id":"wood","position":[-2.5754449367523193,4.491365909576416,-27.45429229736328],"rotation":[0.0000012817193919545389,-0.0000014096898439674987,1.4757723808288574]},{"id":"wood","position":[-0.3548743724822998,3.385812759399414,-27.063838958740234],"rotation":[-8.944706451075035e-7,7.843482876523922e-7,1.7421609163284302]},{"id":"wood","position":[0.7200579643249512,-2.3141818046569824,-27.222476959228516],"rotation":[-0.000004751131200464442,0.000004631452611647546,1.5996795892715454]},{"id":"wood2","position":[-3.0383920669555664,0.37034106254577637,-27.45429229736328],"rotation":[1.1138011046796237e-7,-2.0575556902713288e-7,0.9923134446144104]},{"id":"wood2","position":[3.040311813354492,-3.0374293327331543,-27.45429229736328],"rotation":[1.6246616496573552e-7,-2.646748953338829e-7,1.1010576486587524]},{"id":"wood3","position":[0.41447028517723083,0.9233768582344055,-27.45429229736328],"rotation":[0,0,0]},{"id":"wood3","position":[-1.7472654581069946,-2.6592750549316406,-27.45429229736328],"rotation":[-2.687215499008744e-7,-1.0119481919090845e-9,-3.134061098098755]}],{"id":"pipe4","position":[1.271722674369812,-6.524158954620361,-20.45261573791504],"rotation":[4.913493167890692e-9,3.666720971295945e-8,-0.266417533159256]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[-1.0546574592590332,1.4908900260925293,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-18.61194610595703]},{"position":[-2.5615522861480713,-3.022151231765747,-16.863445281982422]},{"position":[2.1136136054992676,-0.3373130261898041,-18.61194610595703]},{"position":[-2.917943000793457,-1.1236685514450073,-24.4769344329834]},{"position":[0.0030747652053833008,-1.957127571105957,-22.6876277923584]},{"position":[-3.6777877807617188,0.2887909412384033,-38.521846771240234]},{"position":[0.6679723262786865,-3.7116105556488037,-36.27304458618164]},{"position":[1.525851845741272,1.4805172681808472,-35.601036071777344]},{"position":[2.125823974609375,-0.032056331634521484,-41.1500358581543]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[-0.024139881134033203,3.1790060997009277,-25.03202247619629]},{"position":[3.2535014152526855,-0.5334906578063965,-47.58177947998047]}]},"chunk5":{"static":[{"id":"segment5","position":[0,0,-25],"rotation":[0,0,0]},[{"id":"pipe5","position":[-0.316500186920166,-3.801436424255371,-19.462465286254883],"rotation":[0,0,-3.1389048099517822]},{"id":"pipe5","position":[-0.3286581039428711,-3.819007396697998,-19.462465286254883],"rotation":[2.687186508865125e-7,3.1415929794311523,-6.2804975509643555]}],[{"id":"pipe4","position":[-1.3117015361785889,1.6074326038360596,-33.153812408447266],"rotation":[1.570796251296997,1.5707961320877075,4.371138828673793e-8]},{"id":"pipe4","position":[2.2623865604400635,1.6115041971206665,-24.10892105102539],"rotation":[4.71238899230957,3.1415929794311523,-4.3711366970455856e-8]},{"id":"pipe5","position":[0.7696637511253357,1.6552268266677856,-33.15047836303711],"rotation":[-0.000049990121624432504,3.141542673110962,-7.85129451751709]}]],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[-1.0546574592590332,1.4908900260925293,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-18.61194610595703]},{"position":[-2.152177333831787,-3.096832752227783,-21.73511505126953]},{"position":[2.1136136054992676,-0.3373130261898041,-16.745929718017578]},{"position":[0.2887909412384033,2.855783462524414,-25.413917541503906]},{"position":[-2.917943000793457,0.4062175750732422,-40.13908386230469]},{"position":[-0.6563220024108887,-0.4283006191253662,-25.413917541503906]},{"position":[-3.6777877807617188,0.2887909412384033,-30.036991119384766]},{"position":[0.6679723262786865,-3.7116105556488037,-30.036991119384766]},{"position":[2.012166976928711,3.0731992721557617,-39.05812072753906]},{"position":[2.125823974609375,-0.032056331634521484,-37.51763153076172]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[2.2061877250671387,-2.495795965194702,-26.592029571533203]},{"position":[-2.39861798286438,-1.095296859741211,-19.44569206237793]}]},"chunk6":{"static":[{"id":"propeller","position":[0,0,-36.41916275024414],"rotation":[0,0,0]},{"id":"segment2","position":[0,0,-25],"rotation":[0,0,0]},{"id":"grid","position":[0,0,-18.698671340942383],"rotation":[0,0,0]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[-1.0546574592590332,1.4908900260925293,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,-2.521085262298584,-18.61194610595703]},{"position":[-2.152177333831787,-3.096832752227783,-21.73511505126953]},{"position":[2.1136136054992676,-0.3373130261898041,-16.745929718017578]},{"position":[0.2887909412384033,2.855783462524414,-25.413917541503906]},{"position":[-2.917943000793457,-1.1236685514450073,-25.413917541503906]},{"position":[0.0030747652053833008,-1.957127571105957,-25.413917541503906]},{"position":[-3.6777877807617188,0.2887909412384033,-30.036991119384766]},{"position":[0.6679723262786865,-3.7116105556488037,-30.036991119384766]},{"position":[1.525851845741272,1.4805172681808472,-30.036989212036133]},{"position":[2.125823974609375,-0.032056331634521484,-33.6531867980957]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[2.328453779220581,-2.4877400398254395,-39.383480072021484]},{"position":[-3.013350486755371,-2.262382984161377,-9.451505661010742]}]},"chunk7":{"static":[{"id":"grid2","position":[-0.6067008972167969,6.066601753234863,-28.33737564086914],"rotation":[-5.0289685304960585e-8,-1.0972352271210184e-7,-3.039478063583374]},{"id":"segment1","position":[0,0,-25],"rotation":[0,0,0]},{"id":"propeller","position":[0,0,-18.041412353515625],"rotation":[0,0,0]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[-1.0546574592590332,1.4908900260925293,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-37.39554977416992]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-35.17909622192383]},{"position":[-2.152177333831787,-3.096832752227783,-21.73511505126953]},{"position":[2.1136136054992676,2.0773541927337646,-20.693315505981445]},{"position":[0.2887909412384033,2.855783462524414,-25.413917541503906]},{"position":[-2.917943000793457,-1.1236685514450073,-25.413917541503906]},{"position":[-1.3266010284423828,0.41614627838134766,-16.40656089782715]},{"position":[-3.6777877807617188,0.2887909412384033,-40.770530700683594]},{"position":[0.6679723262786865,-3.7116105556488037,-39.34104919433594]},{"position":[1.39267098903656,-2.9575648307800293,-30.05492401123047]},{"position":[2.125823974609375,-0.032056331634521484,-33.6531867980957]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[-0.8962292075157166,-2.619844913482666,-15.933425903320312]},{"position":[2.0061094760894775,1.9338245391845703,-47.57902145385742]}]},"chunk8":{"static":[{"id":"pipe","position":[-4.104297161102295,-4.39487886428833,-32.19648361206055],"rotation":[1.4551170934851143e-8,-4.262308550551097e-8,-0.7463656067848206]},{"id":"pipe","position":[-3.6340813636779785,4.776986122131348,-30.527177810668945],"rotation":[-0.6184318661689758,-1.5707963705062866,-3.1415932178497314]},{"id":"segment6","position":[0,0,-25],"rotation":[0,0,0]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[0.032056450843811035,2.125823974609375,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-18.61194610595703]},{"position":[-2.152177333831787,-3.096832752227783,-18.61194610595703]},{"position":[2.125823974609375,-0.032056331634521484,-18.61194610595703]},{"position":[0.2887909412384033,2.855783462524414,-25.413917541503906]},{"position":[-3.7116105556488037,-1.4899765253067017,-25.413917541503906]},{"position":[-3.6777877807617188,0.2887909412384033,-24.89388656616211]},{"position":[0.6679723262786865,-3.7116105556488037,-30.036991119384766]},{"position":[1.525851845741272,1.4805172681808472,-14.328935623168945]},{"position":[-2.3963825702667236,2.8047945499420166,-37.702579498291016]},{"position":[-2.152177333831787,-3.096832752227783,-37.702579498291016]},{"position":[2.125823974609375,-0.032056331634521484,-37.702579498291016]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[3.4863266944885254,-0.8029362559318542,-30.806211471557617]},{"position":[-0.08763709664344788,-0.10603177547454834,-8.061078071594238]}]},"chunk9":{"static":[{"id":"grid2","position":[-1.8266565799713135,-6.214754104614258,-23.869022369384766],"rotation":[0,0,-0.2939189374446869]},[{"id":"wood","position":[-1.0505784749984741,2.1952078342437744,-23.809051513671875],"rotation":[6.632249096583109e-7,7.605465839333192e-7,-1.3952265977859497]},{"id":"wood","position":[1.6282193660736084,1.1723496913909912,-23.809051513671875],"rotation":[0.00000261248442257056,0.0000027182643407286378,-1.5212059020996094]},{"id":"wood2","position":[3.059880256652832,0.08885146677494049,-24.04086685180664],"rotation":[-4.554047734472988e-7,-2.9157880021557503e-7,-2.002593517303467]},{"id":"wood2","position":[-3.451624870300293,2.571558713912964,-24.04086685180664],"rotation":[-5.575859631790081e-7,-4.0133383549800783e-7,-1.8938491344451904]},{"id":"wood3","position":[1.3398091793060303,2.8972203731536865,-24.04086685180664],"rotation":[1.613719491366794e-9,-2.0886343321535605e-8,0.15421757102012634]}],{"id":"segment7","position":[0,0,-25],"rotation":[0,0,0]}],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[0.032056450843811035,2.125823974609375,-4.816712379455566]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-18.61194610595703]},{"position":[-2.152177333831787,-3.096832752227783,-18.61194610595703]},{"position":[2.125823974609375,-0.032056331634521484,-18.61194610595703]},{"position":[0.2887909412384033,2.855783462524414,-34.552146911621094]},{"position":[-3.7116105556488037,-1.4899765253067017,-15.23830509185791]},{"position":[-3.6777877807617188,0.2887909412384033,-33.12775802612305]},{"position":[0.6679723262786865,-3.7116105556488037,-30.036991119384766]},{"position":[1.525851845741272,1.4805172681808472,-14.328935623168945]},{"position":[-2.3963825702667236,2.8047945499420166,-37.702579498291016]},{"position":[-2.152177333831787,-3.096832752227783,-37.702579498291016]},{"position":[2.125823974609375,-0.032056331634521484,-37.702579498291016]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[0.35880619287490845,2.686565399169922,-30.806211471557617]},{"position":[0.7190965414047241,2.8721375465393066,-4.105911731719971]}]},"chunk10":{"static":[{"id":"segment3","position":[0,0,-25],"rotation":[0,0,0]},{"id":"pipe","position":[-3.311255931854248,-6.170806407928467,-24.28780174255371],"rotation":[-1.6626113819029342e-9,3.1415929794311523,0.01874575950205326]},{"id":"pipe4","position":[6.512289047241211,1.8504080772399902,-24.312965393066406],"rotation":[7.024941623967607e-7,-8.259969490609365e-7,1.4095458984375]},[{"id":"wood2","position":[0.3502954840660095,4.3766679763793945,-24.221328735351562],"rotation":[-0.0000014189146213539061,-0.000001277509340980032,-1.6755836009979248]},{"id":"wood2","position":[-0.06039579212665558,3.1241493225097656,-24.221328735351562],"rotation":[0.07817467302083969,0.06741210073232651,-1.5924851894378662]},{"id":"wood3","position":[0.008901622146368027,0.14883732795715332,-24.455455780029297],"rotation":[-0.009936874732375145,-0.0031933875288814306,-4.442006587982178]}]],"random":[{"position":[-2.8047947883605957,-2.3963825702667236,-4.816713333129883]},{"position":[3.096832752227783,-2.152177333831787,-4.816713333129883]},{"position":[3.0003089904785156,0.011849164962768555,-4.816712856292725]},{"position":[-3.6777877807617188,0.2887909412384033,-10.946353912353516]},{"position":[0.6679723262786865,-3.7116105556488037,-10.946353912353516]},{"position":[1.525851845741272,1.4805172681808472,-10.9463529586792]},{"position":[-2.3963825702667236,2.8047945499420166,-18.61194610595703]},{"position":[-2.152177333831787,-3.096832752227783,-18.61194610595703]},{"position":[2.125823974609375,-0.032056331634521484,-18.61194610595703]},{"position":[0.2887909412384033,2.855783462524414,-34.552146911621094]},{"position":[-3.7116105556488037,-1.4899765253067017,-15.23830509185791]},{"position":[-3.6777877807617188,0.2887909412384033,-33.12775802612305]},{"position":[0.6679723262786865,-3.7116105556488037,-30.036991119384766]},{"position":[1.525851845741272,1.4805172681808472,-14.328935623168945]},{"position":[-2.3963825702667236,2.8047945499420166,-37.702579498291016]},{"position":[-2.152177333831787,-3.096832752227783,-37.702579498291016]},{"position":[2.125823974609375,-0.032056331634521484,-37.702579498291016]},{"position":[0.2887909412384033,2.855783462524414,-44.50455093383789]},{"position":[-3.7116105556488037,-1.4899765253067017,-44.50455093383789]},{"position":[1.4805172681808472,-2.347856044769287,-44.50455093383789]}],"collectibles":[{"position":[0.35880619287490845,2.686565399169922,-30.806211471557617]},{"position":[-2.2636351585388184,-0.9503922462463379,-4.105912208557129]}]}}')
          , v = JSON.parse('{"gate":{"static":[{"id":"grid","position":[0,0,-26.243688583374023],"rotation":[0,0,0]},{"id":"segment3","position":[0,0,-25],"rotation":[0,0,0]}],"random":[],"collectibles":[]},"barricade":{"static":[{"id":"segment4","position":[0,0,-25],"rotation":[0,0,0]},[{"id":"wood","position":[2.9228453636169434,2.613133430480957,-42.84403610229492],"rotation":[6.62216166347207e-7,-7.851620580368035e-7,1.401315450668335]},{"id":"wood","position":[4.50727653503418,3.536510467529297,-42.84403610229492],"rotation":[9.60248030423827e-7,-0.0000010863298030017177,1.447739839553833]},{"id":"wood","position":[-2.5754449367523193,4.491365909576416,-42.84403610229492],"rotation":[0.0000012817187098335125,-0.0000014096890481596347,1.4757723808288574]},{"id":"wood","position":[-0.3548743724822998,3.385812759399414,-42.453582763671875],"rotation":[-8.944707019509224e-7,7.84348344495811e-7,1.7421609163284302]},{"id":"wood","position":[0.7200579643249512,-2.3141818046569824,-42.612220764160156],"rotation":[-0.000004751161213789601,0.000004631482170225354,1.5996793508529663]},{"id":"wood2","position":[-3.0383920669555664,0.37034106254577637,-42.84403610229492],"rotation":[1.113800891516803e-7,-2.0575551218371402e-7,0.9923133254051208]},{"id":"wood2","position":[3.040311813354492,-3.0374293327331543,-42.84403610229492],"rotation":[1.6246617917659023e-7,-2.646748953338829e-7,1.1010576486587524]},{"id":"wood3","position":[0.41447028517723083,0.9233768582344055,-42.84403610229492],"rotation":[0,0,0]},{"id":"wood3","position":[-1.7472654581069946,-2.6592750549316406,-42.84403610229492],"rotation":[-2.6872152147916495e-7,-1.0119479698644795e-9,-3.134061098098755]}]],"random":[],"collectibles":[]},"collectible":{"static":[{"id":"segment5","position":[0,0,-25],"rotation":[0,0,0]}],"random":[],"collectibles":[{"position":[0,0,-25]}]}}')
          , y = JSON.parse('["applecore","ball","bananapeel","beercan","bones","bottle","bottle2","cardboard","cardboard2","cigarette","cigarette2","cigarette3","fishcarcass","hotdog","magazine","meat","nail","nail2","pizza","pizzabox","plasticduck","sandwich","sausage","shoes","skateboard","soda","spraypaint","straw","syringe","tincan","tincan2","toiletpaper","toiletplunger","wrench"]');
        let x = 2 * Math.PI
          , b = new Map([[u.GF.Idle, ()=>w(Math.random)], [u.GF.Game, (e,t)=>e.chunkIndex < 5 ? w(t) : {
            data: g[S(t, g)],
            config: {
                staticObstaclesDensity: (0,
                m.RY)(e, t),
                floatingObstaclesDensity: (0,
                m.vk)(e, t),
                trashObjectsDensity: (0,
                m.IH)(e, t),
                collectibleDensity: (0,
                m.HN)(e, t),
                angle: t() * x
            }
        }], [u.GF.Tutorial, e=>(function(e, t) {
            let i = d.MF[e];
            return "empty" === i ? w(t) : {
                data: v[i],
                config: {
                    staticObstaclesDensity: 1,
                    floatingObstaclesDensity: 1,
                    trashObjectsDensity: t() * p.DD,
                    collectibleDensity: 1,
                    angle: 0
                }
            }
        }
        )(e.chunkIndex, Math.random)]]);
        function S(e, t) {
            let i = Math.ceil(e() * Object.keys(t).length);
            return "chunk".concat(i)
        }
        function w(e) {
            let t = S(e, g);
            return {
                data: g[t],
                config: {
                    staticObstaclesDensity: 0,
                    floatingObstaclesDensity: 0,
                    trashObjectsDensity: e(),
                    collectibleDensity: 0,
                    angle: e() * x
                }
            }
        }
        var _ = i(34551)
          , T = i(26954)
          , C = i(22183);
        class P {
            dispose() {
                this.entities.length = 0
            }
            addEntity(e) {
                this.entities.push(e)
            }
            translate(e) {
                for (let t of this.entities)
                    t.transform.position.add(e)
            }
            rotate(e) {
                for (let t of (this.rotationMatrix.makeRotationZ(e),
                this.entities))
                    t.transform.getObject3D().applyMatrix4(this.rotationMatrix)
            }
            constructor() {
                this.entities = [],
                this.rotationMatrix = new s.yGw
            }
        }
        class E {
            createChunk(e) {
                let t = new P
                  , {config: i} = e;
                if (this.addStaticElements(e, t),
                this.addFloatingElements(e, t),
                this.addCollectibles(e, t),
                this.addTrashObjects(e, t),
                this.showHelpers) {
                    let s = [];
                    for (let n of t.entities)
                        n.forEachComponent(e=>{
                            if (e instanceof r.D) {
                                let t = (0,
                                c.C)(e.obb);
                                t.addComponent(a.m),
                                s.push(t)
                            }
                            if (e instanceof l.B) {
                                let i = (0,
                                h.s)(e.sphere);
                                i.addComponent(a.m),
                                s.push(i)
                            }
                        }
                        );
                    for (let o of s)
                        t.addEntity(o)
                }
                return t.rotate(i.angle),
                t
            }
            addStaticElements(e, t) {
                let {data: i, config: s} = e;
                for (let n of i.static)
                    if (Array.isArray(n)) {
                        if (this.context.random() < s.staticObstaclesDensity)
                            for (let o of n) {
                                let r = this.createStaticElement(o);
                                t.addEntity(r),
                                (0,
                                _.i$)(o.id) && this.onSpawnDestructibleObstacle.emit()
                            }
                    } else if (!(0,
                    _.Ug)(n.id) || this.context.random() < s.staticObstaclesDensity) {
                        let a = this.createStaticElement(n);
                        t.addEntity(a),
                        (0,
                        _.i$)(n.id) && this.onSpawnDestructibleObstacle.emit()
                    }
            }
            addFloatingElements(e, t) {
                let {data: i, config: s} = e
                  , {random: n} = this.context;
                for (let o of i.random)
                    if (n() < s.floatingObstaclesDensity) {
                        let r = f[Math.floor(n() * f.length)]
                          , a = this.entityFactory.create(r);
                        a.transform.position.fromArray(o.position),
                        a.transform.rotation.set(n(), n(), n()),
                        t.addEntity(a),
                        this.onSpawnDestructibleObstacle.emit()
                    }
            }
            addCollectibles(e, t) {
                let {data: i, config: s} = e
                  , {random: n} = this.context;
                for (let o of i.collectibles)
                    if (n() < s.collectibleDensity) {
                        let r = (0,
                        m.Dw)(n)
                          , a = this.getRandomCollectibleByRarity(r)
                          , l = this.entityFactory.create(a);
                        l.transform.position.fromArray(o.position),
                        this.onSpawnCollectible.emit(r),
                        t.addEntity(l)
                    }
            }
            addTrashObjects(e, t) {
                let {config: i} = e
                  , {random: s} = this.context
                  , n = i.trashObjectsDensity * p.Xf;
                for (let o = 0; o < n; o += 1) {
                    let r = y[Math.floor(s() * y.length)]
                      , a = this.entityFactory.create(r)
                      , l = (0,
                    T.C)(p.RE, p.YL, this.tmpVector3, s);
                    l.z -= p.YL,
                    a.transform.position.copy(l),
                    d.Y_.includes(r) && this.onSpawnBonusItem.emit(),
                    t.addEntity(a)
                }
            }
            createStaticElement(e) {
                let {id: t, position: i, rotation: s} = e
                  , n = this.entityFactory.create(t);
                return n.transform.position.fromArray(i),
                n.transform.rotation.fromArray(s),
                n.transform.rotation.order = "YZX",
                n
            }
            getRandomCollectibleByRarity(e) {
                let t = d.KW.get(e);
                return t[Math.floor(this.context.random() * t.length)]
            }
            constructor(e) {
                this.onSpawnCollectible = new C.M,
                this.onSpawnBonusItem = new C.M,
                this.onSpawnDestructibleObstacle = new C.M,
                this.showHelpers = !1,
                this.tmpVector3 = new s.Pa4,
                this.context = e,
                this.entityFactory = this.context.entityFactory
            }
        }
        var M = i(21965);
        class R extends M.d {
            init() {
                this.initQueue(),
                this.chunkFactory.onSpawnCollectible.add(this.handleCollectibleSpawned),
                this.chunkFactory.onSpawnBonusItem.add(this.handleBonusItemSpawned),
                this.chunkFactory.onSpawnDestructibleObstacle.add(this.handleDestructibleObstacleSpawned)
            }
            dispose() {
                this.chunkFactory.onSpawnCollectible.remove(this.handleCollectibleSpawned),
                this.chunkFactory.onSpawnBonusItem.remove(this.handleBonusItemSpawned),
                this.chunkFactory.onSpawnDestructibleObstacle.remove(this.handleDestructibleObstacleSpawned)
            }
            updateElements() {
                let e = this.context.components.getComponentsOfType(a.m)
                  , t = this.state.speed * this.context.time.fixedDelta;
                e && e.forEachComponent(e=>{
                    let {position: i} = e.entity.transform;
                    i.z = (0,
                    n.s)(i.z + t)
                }
                ),
                this.distanceTravelledSinceChunkAdded = (0,
                n.s)(this.distanceTravelledSinceChunkAdded + t)
            }
            initQueue() {
                this.distanceTravelledSinceChunkAdded = 0;
                for (let e = 0; e < this.chunkCount; e += 1) {
                    let t = new s.Pa4(0,0,-(e * p.YL)).add(this.chunkSpawnOffset);
                    this.addChunk(t)
                }
            }
            emptyQueue() {
                for (let e of this.chunkQueue.items)
                    for (let t of e.entities)
                        this.context.entities.remove(t);
                this.chunkQueue.empty()
            }
            addChunk(e) {
                var t, i;
                let s = (t = this.state,
                i = this.context.random,
                b.get(t.mode)(t, i))
                  , n = this.chunkFactory.createChunk(s);
                for (let o of (n.translate(e),
                n.entities))
                    this.context.entities.add(o);
                this.chunkQueue.push(n),
                this.distanceTravelledSinceChunkAdded = this.distanceTravelledSinceChunkAdded % p.YL,
                this.state.chunkIndex += 1
            }
            updateChunkQueue() {
                if (this.distanceTravelledSinceChunkAdded > p.YL) {
                    let e = this.chunkQueue.shift();
                    for (let t of e.entities)
                        this.context.entities.remove(t);
                    e.dispose(),
                    this.newChunkSpawnPosition.set(0, 0, this.distanceTravelledSinceChunkAdded - p.YL * this.chunkCount),
                    this.newChunkSpawnPosition.add(this.chunkSpawnOffset),
                    this.addChunk(this.newChunkSpawnPosition)
                }
            }
            fixedUpdate() {
                this.updateElements(),
                this.updateChunkQueue()
            }
            constructor(e) {
                super(e),
                this.chunkQueue = new o,
                this.chunkCount = 3,
                this.distanceTravelledSinceChunkAdded = 0,
                this.chunkSpawnOffset = new s.Pa4(0,0,5),
                this.newChunkSpawnPosition = new s.Pa4,
                this.handleCollectibleSpawned = e=>{
                    this.state.stats.itemsByRarity[e].spawnedCount += 1
                }
                ,
                this.handleBonusItemSpawned = ()=>{
                    this.state.stats.bonusItems.spawnedCount += 1
                }
                ,
                this.handleDestructibleObstacleSpawned = ()=>{
                    this.state.stats.obstacles.spawnedCount += 1
                }
                ,
                this.state = this.context.state,
                this.chunkFactory = new E(e)
            }
        }
    },
    50710: function(e, t, i) {
        i.d(t, {
            j: function() {
                return r
            }
        });
        var s = i(22183)
          , n = i(3005)
          , o = i(45658);
        class r extends o.F {
            handleCollisionWithLethalObstacle() {
                this.handleFailStep(this.steps[this.currentStepIndex])
            }
            getStepIndex(e) {
                return this.steps.indexOf(e)
            }
            isTutorialComplete() {
                return this.completedSteps.length === this.steps.length
            }
            hasStepBeenCompleted(e) {
                return this.completedSteps.includes(e)
            }
            handleCompleteStep(e) {
                let t = this.getStepIndex(e);
                this.completedSteps.push(e),
                this.onStepSuccess.emit((t + 1).toString())
            }
            handleFailStep(e) {
                let t = this.getStepIndex(e);
                this.onStepFail.emit((t + 1).toString())
            }
            handleBeginStep(e) {
                let t = this.getStepIndex(e);
                this.currentStepIndex = t,
                this.onStepBegin.emit((t + 1).toString())
            }
            handleReachStepEnd(e) {
                this.handleCompleteStep(e)
            }
            updateSpeed() {
                let e = n.P2 * this.state.dashFactor;
                this.state.speed = (n.QB + e) * this.state.globalSpeedFactor
            }
            fixedUpdate() {
                let e = this.state.chunkIndex + this.CHUNK_INDEX_OFFSET;
                for (let t of this.steps)
                    e !== t.end || this.hasStepBeenCompleted(t) || this.handleReachStepEnd(t),
                    e === t.start && this.getStepIndex(t) > this.currentStepIndex && this.handleBeginStep(t);
                this.isTutorialComplete() && !this.completed && (this.onComplete.emit(),
                this.completed = !0),
                this.updateSpeed(),
                this.state.tutorialModeStarted || (this.state.tutorialModeStarted = !0,
                this.onStart.emit())
            }
            constructor(...e) {
                super(...e),
                this.onStart = new s.M,
                this.onStepBegin = new s.M,
                this.onStepFail = new s.M,
                this.onStepSuccess = new s.M,
                this.onComplete = new s.M,
                this.CHUNK_INDEX_OFFSET = -4,
                this.currentStepIndex = -1,
                this.completedSteps = [],
                this.completed = !1,
                this.steps = [{
                    start: -2,
                    end: 5
                }, {
                    start: 6,
                    end: 12
                }, {
                    start: 13,
                    end: 19
                }]
            }
        }
    },
    77239: function(e, t, i) {
        i.d(t, {
            K: function() {
                return h
            }
        });
        var s = i(79404)
          , n = i(21965);
        class o extends n.d {
            dispose() {
                this.renderer.dispose()
            }
            get renderContext() {
                return this.renderer.getRenderContext()
            }
            constructor(e, t) {
                super(e),
                this.renderer = t
            }
        }
        var r = i(60462)
          , a = i(26460)
          , l = i(19431);
        class h extends o {
            init() {
                this.context.entities.onRemoveEntity.add(this.handleEntityRemoved)
            }
            dispose() {
                this.context.entities.onRemoveEntity.remove(this.handleEntityRemoved)
            }
            reset(e) {
                let t = a.i.createDefaultRenderContext();
                return this.context = e,
                this.renderer.setRenderContext(t),
                this
            }
            update() {
                let e = this.context.components.getComponentsOfType(r.M);
                this.prepareCamera(),
                e && this.prepareRenderables(e),
                this.renderer.render()
            }
            prepareCamera() {
                let {scene: e} = this.renderContext
                  , t = this.context.components.getComponentOfType(l.V)
                  , i = null == t ? void 0 : t.entity.transform;
                i && e.add(i.getObject3D())
            }
            prepareRenderables(e) {
                let {scene: t} = this.renderContext;
                e.forEachComponent(e=>{
                    let {transform: i} = e.entity;
                    if (i) {
                        let s = i.getObject3D();
                        s.parent || t.add(s),
                        s.visible = e.enabled
                    }
                }
                )
            }
            constructor(e, t={}) {
                let {container: i, renderer: n} = t;
                super(e, n || new s.T({
                    container: i
                })),
                this.handleEntityRemoved = e=>{
                    let t = e.transform.getObject3D();
                    t.parent && t.parent.remove(t)
                }
            }
        }
    },
    10051: function(e, t, i) {
        function s(e) {
            localStorage.setItem("gameData", JSON.stringify(e))
        }
        function n(e) {
            let t = new URLSearchParams(window.location.search);
            return t.get(e)
        }
        i.d(t, {
            d: function() {
                return s
            },
            i: function() {
                return n
            }
        })
    },
    34551: function(e, t, i) {
        i.d(t, {
            DO: function() {
                return y
            },
            JD: function() {
                return g
            },
            RC: function() {
                return x
            },
            lO: function() {
                return v
            },
            i$: function() {
                return m
            },
            Ug: function() {
                return f
            }
        });
        var s = i(96995)
          , n = i(26013)
          , o = i(90070)
          , r = i(95464)
          , a = i(27172)
          , l = JSON.parse('["cable","cable2","grid","grid2","pipe","pipe2","pipe3","pipe4","pipe5","propeller","wood","wood2","wood3","wood4"]')
          , h = JSON.parse('{"barrel":[{"type":"box","half_size":[0.2569233775138855,0.4594474136829376,0.2659001052379608],"position":[-0.0018243365921080112,-0.02918938919901848,-3.921851732258119e-9],"rotation":[0,0,0]}],"car":[{"type":"box","half_size":[2.113877058029175,0.36876004934310913,0.8024619817733765],"position":[-0.2012186497449875,0.0589778795838356,7.92419907469366e-9],"rotation":[0,0,0]},{"type":"box","half_size":[0.6387537121772766,0.38160964846611023,0.7468027472496033],"position":[-0.42672231793403625,0.7112038731575012,1.3983880720047637e-8],"rotation":[1.2401933924266473e-9,-1.8297532378142023e-8,0.13535141944885254]},{"type":"box","half_size":[0.6387537717819214,0.3051142692565918,0.7468027472496033],"position":[0.2046879231929779,0.5273317098617554,-1.0720976106881608e-8],"rotation":[6.566474297642344e-8,1.4817941007549962e-7,-0.83427494764328]},{"type":"box","half_size":[0.4935329258441925,0.3051142990589142,0.7468027472496033],"position":[-1.058132529258728,0.5030467510223389,-1.3983881608226056e-8],"rotation":[6.257109674834282e-8,-1.439760524135636e-7,0.8199370503425598]}],"christmastree":[{"type":"sphere","radius":1.2141767740249634,"position":[-0.026547236368060112,-0.14158523082733154,1.5852691603868152e-8]}],"cow":[{"type":"box","half_size":[0.403984397649765,0.651865541934967,0.9205905199050903],"position":[0.009017708711326122,0.07514756917953491,1.0096740332699028e-8],"rotation":[0,0,0]},{"type":"sphere","radius":0.3233727812767029,"position":[9.14398999561762e-17,0.41180869936943054,1.1963493824005127]},{"type":"sphere","radius":0.26645973324775696,"position":[-0.018035417422652245,-0.697369396686554,-0.39377322793006897]}],"desk":[{"type":"box","half_size":[0.3215508460998535,0.05499376356601715,0.6711780428886414],"position":[0.07370179891586304,0.39307621121406555,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.0324142687022686,0.035485416650772095,0.4330860376358032],"position":[0.2333889901638031,-0.019302861765027046,-0.4986729323863983],"rotation":[-1.5707963705062866,2.220446313948109e-16,2.220446313948109e-16]},{"type":"box","half_size":[0.0324142687022686,0.035485416650772095,0.4330860376358032],"position":[0.2333889901638031,-0.019302861765027046,0.5085848569869995],"rotation":[-1.5707963705062866,2.220446313948109e-16,2.220446313948109e-16]},{"type":"box","half_size":[0.0324142687022686,0.035485416650772095,0.3391375243663788],"position":[-0.0877402126789093,-0.4211530387401581,0.5085847973823547],"rotation":[-1.5707964897155762,0,-1.5707961320877075]},{"type":"box","half_size":[0.0324142687022686,0.035485416650772095,0.3391375243663788],"position":[-0.0877402126789093,-0.4211530387401581,-0.4986730217933655],"rotation":[-1.5707964897155762,0,-1.5707961320877075]}],"firehydrant":[{"type":"box","half_size":[0.14113286137580872,0.36657094955444336,0.16350600123405457],"position":[-0.03227723389863968,-0.03227723017334938,-0.00445203622803092],"rotation":[0,0,0]}],"freezer":[{"type":"box","half_size":[0.26703372597694397,0.8064762949943542,0.3697829246520996],"position":[-0.062161386013031006,0.0702693909406662,9.441313508773419e-9],"rotation":[0,0,0]}],"locker":[{"type":"box","half_size":[0.4897400140762329,0.90029376745224,0.8241123557090759],"position":[0,-0.06257795542478561,0],"rotation":[0,0,0]}],"metalsheet":[{"type":"box","half_size":[0.5080223083496094,0.022292522713541985,0.47755587100982666],"position":[0,0,0],"rotation":[0,0,0]}],"neon":[{"type":"box","half_size":[0.9374650716781616,0.07583294808864594,0.08099693059921265],"position":[-0.0014358870685100555,0.007179434411227703,9.646203835700362e-10],"rotation":[3.363616676854697e-12,9.50786116504787e-10,-0.0070763505063951015]}],"phonebooth":[{"type":"box","half_size":[0.3843225836753845,0.9714680910110474,0.3843225836753845],"position":[0,-0.1458945870399475,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.4159737527370453,0.14447331428527832,0.28311043977737427],"position":[0,0.9357377290725708,0],"rotation":[0,0,0]}],"radiator":[{"type":"box","half_size":[0.13739676773548126,0.3890554904937744,0.30919960141181946],"position":[0,0.053807541728019714,0],"rotation":[0,0,0]}],"safe":[{"type":"box","half_size":[0.3709011971950531,0.4578472077846527,0.3709011971950531],"position":[-0.07136448472738266,-0.010016066953539848,-1.345746625247557e-9],"rotation":[0,0,0]}],"cone":[{"type":"box","half_size":[0.1746416985988617,0.1746416985988617,0.1746416985988617],"position":[0,-0.297200471162796,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.08840499818325043,0.31029054522514343,0.08840499818325043],"position":[0,0.10694245249032974,0],"rotation":[0,0,0]}],"speaker":[{"type":"box","half_size":[0.18439911305904388,0.38280364871025085,0.20136608183383942],"position":[0,-0.014782845042645931,0],"rotation":[0,0,0]}],"wheel":[{"type":"box","half_size":[0.23262165486812592,0.49372708797454834,0.49372708797454834],"position":[0,0,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.23262165486812592,0.49372705817222595,0.49372705817222595],"position":[0,0,0],"rotation":[0.7853981852531433,0,0]}],"trafficsign1":[{"type":"box","half_size":[0.07822857797145844,0.7411706447601318,0.10171866416931152],"position":[-0.05727643892168999,0,0],"rotation":[0,0,0]}],"trafficsign2":[{"type":"box","half_size":[0.058175258338451385,0.23399561643600464,0.23399561643600464],"position":[0,0,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.060237057507038116,0.0929180309176445,0.18854285776615143],"position":[1.7872122217463595e-17,0.08048888295888901,-0.384452760219574],"rotation":[0.40323150157928467,1.780847066932764e-17,-8.712868754310902e-17]},{"type":"box","half_size":[0.060237057507038116,0.0929180383682251,0.18854287266731262],"position":[1.5138738624867842e-17,0.06817881762981415,0.4014975130558014],"rotation":[-0.38216662406921387,1.6018564320326194e-17,8.28074629359075e-17]}],"trafficsign3":[{"type":"box","half_size":[0.13379454612731934,0.10308293253183365,0.24905171990394592],"position":[0.028444727882742882,-0.18538117408752441,6.589310208582333e-10],"rotation":[0,0,0]},{"type":"box","half_size":[0.11215222626924515,0.10181556642055511,0.1495674103498459],"position":[0.054927751421928406,-0.007846832275390625,6.589310208582333e-10],"rotation":[0,0,0]},{"type":"box","half_size":[0.058020930737257004,0.10181556642055511,0.07787343859672546],"position":[0.09710442274808884,0.16968747973442078,6.589310208582333e-10],"rotation":[0,0,0]}],"trafficsign4":[{"type":"box","half_size":[0.10191705077886581,0.2983693480491638,0.2983693480491638],"position":[0,0,0],"rotation":[0,0,0]}],"trafficsign5":[{"type":"box","half_size":[0.034115735441446304,0.9056868553161621,0.034115735441446304],"position":[0.01608232595026493,-0.2823341488838196,0.057181596755981445],"rotation":[0,0,0]},{"type":"box","half_size":[0.11181081086397171,0.13801896572113037,0.30596089363098145],"position":[1.5394950871288997e-16,0.6933269500732422,0.017869247123599052],"rotation":[0,0.18194279074668884,0]},{"type":"box","half_size":[0.11181081086397171,0.13801896572113037,0.1526227593421936],"position":[1.5394950871288997e-16,0.9611295461654663,0.017869247123599052],"rotation":[0,0.18194279074668884,0]}],"bin":[{"type":"sphere","radius":0.436660498380661,"position":[0,0,0]}],"trash":[{"type":"sphere","radius":0.2705526053905487,"position":[0,0,0]}],"lid":[{"type":"box","half_size":[0.3278336822986603,0.0745493695139885,0.3278336822986603],"position":[0,0.015231814235448837,0],"rotation":[0,0,0]}],"tv":[{"type":"box","half_size":[0.18601512908935547,0.38466978073120117,0.47871971130371094],"position":[0.13759812712669373,0,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.180114284157753,0.24065068364143372,0.37624943256378174],"position":[-0.17527379095554352,-0.0737132728099823,-9.904029596441433e-9],"rotation":[0,0,0]}],"wc":[{"type":"box","half_size":[0.10622581839561462,0.4053443968296051,0.24743176996707916],"position":[-0.34946441650390625,0.20177407562732697,-0.004160264506936073],"rotation":[0,0,0]},{"type":"box","half_size":[0.4399075210094452,0.27060216665267944,0.27060216665267944],"position":[-0.043433427810668945,-0.4148641526699066,0.02246551401913166],"rotation":[0,0,0]}],"wheelbarrow":[{"type":"box","half_size":[0.6282504200935364,0.3412700593471527,0.41090691089630127],"position":[0.09853685647249222,0.15124259889125824,2.0320779725579996e-8],"rotation":[9.566407666028454e-10,1.6061823870927583e-8,-0.11897960305213928]},{"type":"sphere","radius":0.31899288296699524,"position":[1.2236902713775635,-0.24519631266593933,-3.294429262723497e-8]}],"wheelchair":[{"type":"sphere","radius":0.5277461409568787,"position":[0.13059639930725098,-0.20841795206069946,-0.0343937873840332]},{"type":"box","half_size":[0.09179628640413284,0.3014162480831146,0.3467006981372833],"position":[-0.22047238051891327,0.3695536255836487,4.96527938764757e-8],"rotation":[5.729733576487206e-9,-3.9654906913710875e-8,0.28699377179145813]}],"window":[{"type":"box","half_size":[0.08884114027023315,1.0887864828109741,0.6683005094528198],"position":[0,0,0],"rotation":[0,0,0]}],"grid":[{"type":"box","half_size":[0.4844580888748169,2.98050856590271,6.050173282623291],"position":[0,2.9775466918945312,0],"rotation":[0,1.5707963705062866,0]}],"grid2":[{"type":"box","half_size":[0.40001142024993896,2.4954729080200195,6.223790168762207],"position":[0,2.576450824737549,0],"rotation":[0,1.5707963705062866,0]}],"pipe":[{"type":"box","half_size":[0.48148107528686523,1.6640126705169678,0.4814811050891876],"position":[-0.11809141933917999,1.697016954421997,0.07435387372970581],"rotation":[-0.09733232110738754,1.5707963705062866,2.1578010475709366e-17]},{"type":"box","half_size":[0.48148107528686523,4.470614433288574,0.48148101568222046],"position":[0.11809141933917999,7.470375061035156,0.07435385137796402],"rotation":[0.08311693370342255,1.5707963705062866,-1.8434423054264892e-17]}],"pipe2":[{"type":"box","half_size":[0.6892725825309753,2.491788625717163,0.6704530715942383],"position":[0,2.6489312648773193,0],"rotation":[0,1.5707963705062866,0]},{"type":"box","half_size":[0.6892725825309753,1.0555832386016846,0.6704530715942383],"position":[-0.41192886233329773,5.978690147399902,2.9802322387695312e-8],"rotation":[-0.6943001747131348,1.5707963705062866,1.4207474206709512e-16]},{"type":"box","half_size":[0.6892725825309753,1.0555832386016846,0.6704530119895935],"position":[-2.0115859508514404,6.603448867797852,0],"rotation":[-1.5379891395568848,1.5707963705062866,2.2192510710501945e-16]}],"pipe3":[{"type":"box","half_size":[0.4696728587150574,1.5256754159927368,0.4696728587150574],"position":[-0.11343402415513992,1.622978687286377,7.450580596923828e-9],"rotation":[-0.08385221660137177,1.5707963705062866,1.8597122863309172e-17]},{"type":"box","half_size":[0.4696728587150574,4.449365139007568,0.46967291831970215],"position":[0.10470832139253616,7.373209476470947,-7.450580596923828e-9],"rotation":[0.07958243787288666,1.5707963705062866,-1.7652201362365346e-17]},{"type":"box","half_size":[0.4696728587150574,4.449365139007568,0.46967288851737976],"position":[1.2652255296707153,5.619345188140869,-1.1517914533615112],"rotation":[-0.47626781463623047,1.5707963705062866,1.0179982758514553e-16]},{"type":"box","half_size":[0.4696728587150574,1.2636797428131104,0.46967288851737976],"position":[-1.422288179397583,10.462105751037598,-1.1517914533615112],"rotation":[-0.5994752049446106,1.5707963705062866,1.2527964044003884e-16]}],"pipe4":[{"type":"box","half_size":[0.40087631344795227,1.4916322231292725,0.40087631344795227],"position":[0,1.5056613683700562,0],"rotation":[0,1.5707963705062866,0]},{"type":"box","half_size":[0.498306006193161,4.048692226409912,0.498306006193161],"position":[-4.967276096343994,3.517900228500366,0],"rotation":[-1.5707963705062866,1.5707963705062866,2.220446049250313e-16]},{"type":"box","half_size":[0.498306006193161,0.580787718296051,0.412617951631546],"position":[-0.37289777398109436,3.349040985107422,2.9802322387695312e-8],"rotation":[-0.9087239503860474,1.5707963705062866,1.7513103663175164e-16]}],"pipe5":[{"type":"box","half_size":[0.39800262451171875,1.541975975036621,0.39800262451171875],"position":[0,1.570191740989685,0],"rotation":[0,1.5707963705062866,0]},{"type":"box","half_size":[0.39800262451171875,0.5312451720237732,0.39800262451171875],"position":[-0.2286687195301056,3.302992582321167,1.4901161193847656e-8],"rotation":[-0.7853981852531433,1.5707963705062866,1.5700922994638892e-16]},{"type":"box","half_size":[0.39800262451171875,0.5312451720237732,0.39800262451171875],"position":[-0.9908976554870605,3.5164167881011963,5.960464477539063e-8],"rotation":[-1.5707963705062866,1.5707963705062866,2.220445916901415e-16]},{"type":"box","half_size":[0.5301396250724792,2.5248379707336426,0.5301396250724792],"position":[-3.734922170639038,3.521498203277588,2.384185791015625e-7],"rotation":[-1.5707963705062866,1.5707963705062866,2.220445916901415e-16]}],"wood":[{"type":"box","half_size":[0.1782238930463791,3.381784200668335,0.4309498071670532],"position":[0.06542874872684479,-0.025164902210235596,0],"rotation":[0,1.5707963705062866,0]}],"wood2":[{"type":"box","half_size":[0.16553668677806854,3.0640604496002197,0.3924599885940552],"position":[0.07214304804801941,-0.018035760149359703,0],"rotation":[0,1.5707963705062866,0]}],"wood3":[{"type":"box","half_size":[0.228882297873497,0.7997245192527771,5.028505802154541],"position":[0.6383191347122192,0.6208308339118958,0.026232242584228516],"rotation":[0.18238143622875214,1.5707963705062866,-4.027267778557324e-17]},{"type":"box","half_size":[0.22888228297233582,0.7997246980667114,5.70686674118042],"position":[-0.4109724164009094,-0.3235314190387726,0.02623230218887329],"rotation":[0.5197734236717224,1.5707963705062866,-1.1028589334166175e-16]}],"wood4":[{"type":"box","half_size":[0.22513622045516968,0.7262625098228455,4.848078727722168],"position":[0.3084080219268799,0.11071055382490158,0],"rotation":[0.1794995367527008,1.5707963705062866,-3.964321650047754e-17]},{"type":"box","half_size":[0.22513622045516968,0.44859641790390015,5.375113487243652],"position":[-0.16606587171554565,-1.0201185941696167,0],"rotation":[-0.09114336967468262,1.5707963705062866,2.0209888484132386e-17]},{"type":"box","half_size":[0.22513622045516968,0.44859644770622253,5.375113487243652],"position":[-0.23723693192005157,1.0675660371780396,1.4901161193847656e-8],"rotation":[-0.0464792437851429,1.5707963705062866,1.0316752109716521e-17]}],"applecore":[{"type":"sphere","radius":0.043514106422662735,"position":[0,0,0]}],"ball":[{"type":"sphere","radius":0.15793898701667786,"position":[0,0,0]}],"bananapeel":[{"type":"sphere","radius":0.0749475508928299,"position":[8.255194270878681e-19,0.003717808984220028,0.0012392697390168905]}],"beercan":[{"type":"box","half_size":[0.02714344672858715,0.08150497823953629,0.02714344672858715],"position":[0,0,0],"rotation":[0,0,0]}],"bones":[{"type":"box","half_size":[0.26853418350219727,0.04748886823654175,0.08574381470680237],"position":[0,0,0],"rotation":[0,0,0]}],"bottle":[{"type":"box","half_size":[0.043205201625823975,0.14859861135482788,0.043205201625823975],"position":[0,0,0],"rotation":[0,0,0]}],"bottle2":[{"type":"box","half_size":[0.04455198347568512,0.11613152176141739,0.04455198347568512],"position":[0,-0.06022945046424866,0],"rotation":[0,0,0]}],"cardboard":[{"type":"box","half_size":[0.15895342826843262,0.15895342826843262,0.34732893109321594],"position":[-0.061290886253118515,0.013433615677058697,-0.004198003094643354],"rotation":[0.013712599873542786,0.001008327933959663,-0.07359406352043152]}],"cardboard2":[{"type":"box","half_size":[0.20328158140182495,0.20328158140182495,0.2958841025829315],"position":[0,0,0],"rotation":[0,0,0]}],"cigarette":[{"type":"box","half_size":[0.05535253882408142,0.0060233562253415585,0.0060233562253415585],"position":[0,0,0],"rotation":[0,0,0]}],"cigarette2":[{"type":"box","half_size":[0.05195732042193413,0.005936946254223585,0.005936946254223585],"position":[0,0,0],"rotation":[0,0,0]}],"cigarette3":[{"type":"box","half_size":[0.014756563119590282,0.0035828216932713985,0.0035828216932713985],"position":[0,0.00020601476717274636,0],"rotation":[0,0,0]}],"fishcarcass":[{"type":"box","half_size":[0.2607872784137726,0.03448149934411049,0.11683302372694016],"position":[-0.04544908553361893,0,0.050059858709573746],"rotation":[0,-0.7356388568878174,0]}],"hotdog":[{"type":"box","half_size":[0.03085513971745968,0.03085513971745968,0.09872626513242722],"position":[0,0,0],"rotation":[0,0,0]}],"magazine":[{"type":"box","half_size":[0.20915162563323975,0.03126702457666397,0.20915162563323975],"position":[0,0.00698009692132473,0],"rotation":[0,0,0]}],"meat":[{"type":"sphere","radius":0.06012800335884094,"position":[0,0,0]},{"type":"box","half_size":[0.024900197982788086,0.024900197982788086,0.032432761043310165],"position":[-0.0017189572099596262,0,-0.09610533714294434],"rotation":[0,0,0]}],"nail":[{"type":"box","half_size":[0.01928693614900112,0.01928693614900112,0.10611474514007568],"position":[0,0,0],"rotation":[0,0,0]}],"nail2":[{"type":"box","half_size":[0.01912444643676281,0.02038329653441906,0.07720550149679184],"position":[0,0,0],"rotation":[0,0,0]}],"pizza":[{"type":"box","half_size":[0.10327271372079849,0.038350481539964676,0.12257969379425049],"position":[0.008263400755822659,0.011761831119656563,-0.004131699912250042],"rotation":[0,-0.7439873218536377,0]}],"pizzabox":[{"type":"box","half_size":[0.2463514804840088,0.0766715407371521,0.24524575471878052],"position":[0,0.06297223269939423,0],"rotation":[0,0,0]}],"plasticduck":[{"type":"sphere","radius":0.07162506878376007,"position":[0,0,0]}],"sandwich":[{"type":"box","half_size":[0.06745857000350952,0.022930584847927094,0.06745857000350952],"position":[0,0,0],"rotation":[0,0,0]}],"sausage":[{"type":"box","half_size":[0.14922764897346497,0.043659113347530365,0.034182727336883545],"position":[0,-0.010027828626334667,0],"rotation":[0,-0.549835741519928,0]}],"shoes":[{"type":"box","half_size":[0.18052825331687927,0.04818211868405342,0.06915274262428284],"position":[0,-0.03275412321090698,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.08875604718923569,0.07189764827489853,0.06915273517370224],"position":[0.10811762511730194,0.006376907229423523,5.257599688945902e-9],"rotation":[-1.3435884227419592e-7,0,-1.5707961320877075]}],"skateboard":[{"type":"box","half_size":[0.1405542492866516,0.07043876498937607,0.3839074373245239],"position":[0,0,0],"rotation":[0,0,0]}],"soda":[{"type":"box","half_size":[0.031586289405822754,0.06371957808732986,0.031586289405822754],"position":[0,-0.00105029356200248,0],"rotation":[0,0,0]}],"spraypaint":[{"type":"box","half_size":[0.04655338078737259,0.11734657734632492,0.04655338078737259],"position":[0,0.004208497237414122,0],"rotation":[0,0,0]}],"straw":[{"type":"box","half_size":[0.13230988383293152,0.015738826245069504,0.015738826245069504],"position":[-0.03086836449801922,0,-0.0009571585105732083],"rotation":[0,0,0]}],"syringe":[{"type":"box","half_size":[0.10010633617639542,0.018309336155653,0.018309336155653],"position":[0,0,0],"rotation":[0,0,0]}],"tincan":[{"type":"box","half_size":[0.09278541803359985,0.15599311888217926,0.09278541803359985],"position":[0.00285357516258955,0,0.009783686138689518],"rotation":[0,0,0]}],"tincan2":[{"type":"box","half_size":[0.051948532462120056,0.08115417510271072,0.051948532462120056],"position":[0,-0.00314876320771873,0],"rotation":[0,0,0]}],"toiletpaper":[{"type":"box","half_size":[0.031063487753272057,0.039115361869335175,0.031063487753272057],"position":[0,0,0],"rotation":[0,0,0]}],"toiletplunger":[{"type":"box","half_size":[0.1056513637304306,0.05680859461426735,0.1056513637304306],"position":[0,-0.37364786863327026,0],"rotation":[0,0,0]},{"type":"box","half_size":[0.023599503561854362,0.3779325485229492,0.023599503561854362],"position":[0,0.04428881034255028,0],"rotation":[0,0,0]}],"wrench":[{"type":"box","half_size":[0.13745245337486267,0.02194519340991974,0.03734773397445679],"position":[0,0,0],"rotation":[0,0,0]}],"propeller":[{"type":"box","half_size":[5.670088768005371,0.47518908977508545,0.3367827534675598],"position":[0,0,0],"rotation":[0,0,0]},{"type":"box","half_size":[5.670088768005371,0.47518908977508545,0.3367827534675598],"position":[0,0,0],"rotation":[-1.3435884227419592e-7,0,-1.5707961320877075]},{"type":"box","half_size":[1,1,0.3367827534675598],"position":[4.634284019470215,0,0],"rotation":[0,0,0]},{"type":"box","half_size":[1,1,0.3367827534675598],"position":[-4.634284019470215,0,0],"rotation":[0,0,0]},{"type":"box","half_size":[1,1,0.3367827534675598],"position":[0.017292022705078125,-4.703453063964844,2.1439490183183807e-7],"rotation":[0,0,0]},{"type":"box","half_size":[1,1,0.3367827534675598],"position":[0.017292022705078125,4.720743179321289,2.1439490183183807e-7],"rotation":[0,0,0]}],"player":[{"type":"box","half_size":[0.34809815883636475,0.34809815883636475,0.5837617516517639],"position":[3.537033811853791e-18,-0.5012913942337036,-0.10885077714920044],"rotation":[0,0,0]},{"type":"box","half_size":[0.2346247434616089,0.16013562679290771,0.36169278621673584],"position":[2.0021304539360096e-17,0.12615779042243958,-0.2438698410987854],"rotation":[-0.9480908513069153,9.254041413034124e-17,1.8036760606991454e-16]},{"type":"sphere","radius":0.14447104930877686,"position":[-6.976526485875328e-18,0.5314186215400696,0.04475045204162598]}],"dash":[{"type":"box","half_size":[0.34809815883636475,0.7582677602767944,1.5495671033859253],"position":[8.918402622451138e-17,-0.09165101498365402,-1.065675139427185],"rotation":[0,0,0]}]}')
          , c = i(18297)
          , d = i(72016)
          , p = i(9675);
        class u extends n.D {
        }
        function m(e) {
            return f(e) && !c.P.includes(e)
        }
        function f(e) {
            return a.includes(e) || l.includes(e)
        }
        function g(e, t) {
            let i = h[e];
            if (i)
                for (let r of i)
                    switch (r.type) {
                    case "box":
                        !function(e, t, i, o) {
                            let r = new s.ZzF;
                            r.max.fromArray(t),
                            r.min.set(-t[0], -t[1], -t[2]),
                            e.addComponent(n.D, {
                                box: r,
                                position: i,
                                rotation: o
                            })
                        }(t, r.half_size, r.position, r.rotation);
                        break;
                    case "sphere":
                        !function(e, t, i) {
                            e.addComponent(o.B, {
                                radius: t,
                                position: i
                            })
                        }(t, r.radius, r.position)
                    }
        }
        function v(e) {
            let t = e.getComponentsOfType(r.Y);
            if (t)
                for (let i of t)
                    i.enabled = !1
        }
        function y(e) {
            let t = [];
            for (let i of (e.forEachEntity(e=>{
                e.forEachComponent(e=>{
                    e instanceof n.D && t.push((0,
                    d.C)(e.obb)),
                    e instanceof o.B && t.push((0,
                    p.s)(e.sphere))
                }
                )
            }
            ),
            t))
                e.add(i)
        }
        function x(e) {
            let t = h.dash;
            if (t)
                for (let i of t) {
                    let n = i.half_size
                      , o = i.position
                      , r = i.rotation
                      , a = new s.ZzF;
                    a.max.fromArray(n),
                    a.min.set(-n[0], -n[1], -n[2]),
                    e.addComponent(u, {
                        box: a,
                        position: o,
                        rotation: r
                    })
                }
        }
    },
    21434: function(e, t, i) {
        i.d(t, {
            Hq: function() {
                return o
            },
            Kd: function() {
                return a
            },
            oV: function() {
                return n
            },
            z5: function() {
                return r
            }
        });
        var s = i(88405);
        function n(e) {
            return 10001 + Math.round(1e4 * e)
        }
        function o(e) {
            return (e - 10001) / 1e4
        }
        function r(e) {
            let {length: t} = e
              , i = new ArrayBuffer(t * Int16Array.BYTES_PER_ELEMENT * 2)
              , n = new Int16Array(i)
              , o = 0;
            for (let r of e) {
                let {coords: a, clicked: l} = r
                  , [h,c] = a;
                n[o] = h * (l ? -1 : 1),
                n[o + 1] = c,
                o += 2
            }
            return (0,
            s.c)(i)
        }
        function a(e) {
            let t = (0,
            s.J)(e)
              , i = new Int16Array(t)
              , n = [];
            for (let o = 0; o < i.length; o += 2) {
                let r = Math.abs(i[o])
                  , a = i[o + 1]
                  , l = i[o] < 0;
                n.push({
                    coords: [r, a],
                    clicked: l
                })
            }
            return n
        }
    },
    60124: function(e, t, i) {
        i.d(t, {
            h: function() {
                return d
            },
            U: function() {
                return c
            }
        });
        var s = i(96995)
          , n = i(2064);
        class o extends s.jyz {
            constructor(e) {
                let {resources: t, aoMap: i, maskMap: o, vertexColors: r=!1} = e
                  , a = (0,
                n.Hp)("bricks", t)
                  , l = (0,
                n.Hp)("bricksNoise", t)
                  , h = (0,
                n.Hp)("spots", t)
                  , c = (0,
                n.Hp)("largeSpots", t)
                  , d = (0,
                n.Hp)("threeTone", t);
                d && (d.minFilter = s.TyD,
                d.magFilter = s.TyD),
                a && (a.wrapS = a.wrapT = s.rpg,
                a.anisotropy = 8),
                h && (h.wrapS = h.wrapT = s.rpg,
                h.anisotropy = 8),
                c && (c.wrapS = c.wrapT = s.rpg,
                c.anisotropy = 8),
                l && (l.wrapS = l.wrapT = s.rpg),
                i && (i.flipY = !1),
                o && (o.flipY = !1);
                let p = {
                    maskMap: {
                        value: o
                    },
                    bricksMap: {
                        value: a
                    },
                    bricksNoise: {
                        value: l
                    },
                    spotsMap: {
                        value: h
                    },
                    largeSpotsMap: {
                        value: c
                    },
                    lightingGradient: {
                        value: d
                    },
                    aoMap: {
                        value: i
                    },
                    aoIntensity: {
                        value: .85
                    },
                    pointLight: {
                        value: new s.Pa4(0,0,1)
                    }
                };
                super({
                    uniforms: s.rDY.merge([p, s.rBU.common, s.rBU.fog]),
                    vertexShader: "\n        attribute vec2 uv2;\n        uniform mat3 uv2Transform;\n        uniform vec3 pointLight;\n        varying vec3 vLightDir;\n        varying vec3 vNormal;\n        varying vec3 vViewPosition;\n        varying vec3 vWorldPosition;\n        varying vec2 vUv;\n        varying vec2 vUv2;\n        #include <common>\n        #include <uv_pars_vertex>\n        #include <color_pars_vertex>\n        #include <fog_pars_vertex>\n        #include <clipping_planes_pars_vertex>\n\n        vec4 LinearTosRGB( in vec4 value ) {\n          return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n        }\n\n        vec3 LinearTosRGB( in vec3 value ) {\n          return mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) );\n        }\n  \n        vec3 desaturate(vec3 color, float factor)\n        {\n          vec3 lum = vec3(0.299, 0.587, 0.114);\n          vec3 gray = vec3(dot(lum, color));\n          return mix(color, gray, factor);\n        }\n\n        float maskFromColor(vec4 vertexColor, vec3 colorId) {\n          return 1.0 - step(vec3(0.05), abs(vertexColor.rgb - colorId)).r;\n        } \n\n        void main() {\n          #include <uv_vertex>\n\n          vColor = LinearTosRGB(color);\n\n          vUv = uv;\n          vUv2 = uv2;\n\n          vColor.rgb = desaturate(vColor.rgb, 0.4);\n\n          vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;\n\n          vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;\n          vWorldPosition = worldPosition;\n\n          vLightDir = normalize(pointLight - worldPosition);\n\n          #include <begin_vertex>\n          #include <project_vertex>\n          #include <logdepthbuf_vertex>\n          #include <clipping_planes_vertex>\n          #include <fog_vertex>\n          vViewPosition = - mvPosition.xyz;\n        }\n      ",
                    fragmentShader: "\n        uniform sampler2D maskMap;\n        uniform sampler2D aoMap;\n        uniform sampler2D bricksMap;\n        uniform sampler2D spotsMap;\n        uniform sampler2D largeSpotsMap;\n        uniform sampler2D bricksNoise;\n        uniform sampler2D lightingGradient;\n        uniform vec3 diffuse;\n        uniform float opacity;\n        uniform float aoIntensity;\n        uniform vec3 pointLight;\n        varying vec3 vViewPosition;\n        varying vec3 vWorldPosition;\n        varying vec2 vUv;\n        varying vec2 vUv2;\n        varying vec3 vLightDir;\n        varying vec3 vNormal;\n        #include <common>\n        #include <color_pars_fragment>\n        #include <uv_pars_fragment>\n        #include <map_pars_fragment>\n        #include <fog_pars_fragment>\n        #include <logdepthbuf_pars_fragment>\n        #include <clipping_planes_pars_fragment>\n\n        float remap01(float value, float inMin, float inMax) {\n          return (value - inMin) / (inMax - inMin);\n        }\n\n        void main() {\n          #include <clipping_planes_fragment>\n          vec4 diffuseColor = vec4( diffuse, opacity );\n          #include <logdepthbuf_fragment>\n          #include <map_fragment>\n\n          vec3 masks = texture2D(maskMap, vUv).rgb;\n          float toonMask = masks.r;\n          float metalMask = masks.g;\n          float wallMask = masks.b;\n          float wallAndMetalMask = max(wallMask, metalMask);\n\n          vec4 largeSpots = texture2D(largeSpotsMap, vUv2 * 1.0);\n          float largeSpotsIntensity = mix(0.85, 0.6, wallMask);\n          float m = largeSpots.r * largeSpotsIntensity * wallAndMetalMask;\n          diffuseColor = mix(diffuseColor, diffuseColor * 0.85, m);\n\n          vec4 bricks = texture2D(bricksMap, vUv2 * 4.0);\n          float brickFactor = texture2D(bricksNoise, vUv2 * 1.0).r * wallMask;\n          diffuseColor = mix(diffuseColor, diffuseColor * bricks, brickFactor);\n\n          vec4 spots = vec4(1.0) - texture2D(spotsMap, vUv2 * 4.0);\n          float smallSpotsIntensity = 0.5;\n          float spotsFactor = texture2D(bricksNoise, (vUv2 + 0.5) * 1.0).r * smallSpotsIntensity * wallAndMetalMask;\n          diffuseColor = mix(diffuseColor, diffuseColor * spots, spotsFactor);\n\n          float ao = texture2D(aoMap, vUv).r;\n          diffuseColor *= mix(1.0, ao, aoIntensity);\n\n          diffuseColor *= vec4(0.8, 0.8, 1.0, 1.0);\n\n          float radius = 30.0;\n          vec3 lightDir = normalize(pointLight - vWorldPosition);\n          float lightDistance = distance(vWorldPosition, pointLight);\n          float lightAttenuation = 1.0 - clamp(remap01(lightDistance, 0.0, radius), 0.0, 1.0);\n          float lighting = dot(normalize(vNormal), lightDir) * lightAttenuation;\n          float toonLighting = texture2D(lightingGradient, vec2(lighting, 0.0)).r;\n\n          float lightIntensity = 0.5;\n          float finalLighting = mix(lighting, toonLighting, toonMask) * lightIntensity;\n\n          diffuseColor += finalLighting;\n\n          float darken = pow(clamp(1.0 - (vWorldPosition.z / -15.0), 0.0, 1.0), 2.0);\n          diffuseColor = mix(diffuseColor, diffuseColor * vec4(0.5), darken);\n\n          #include <color_fragment>\n          vec3 outgoingLight = diffuseColor.rgb;\n          #include <output_fragment>\n          #include <tonemapping_fragment>\n          #include <encodings_fragment>\n          #include <fog_fragment>\n          #include <premultiplied_alpha_fragment>\n        }\n      "
                }),
                this.vertexColors = r,
                this.fog = !0
            }
        }
        class r extends s.jyz {
            constructor(e) {
                let {map: t=null, aoMap: i=null, gradientMap: n, color: o, vertexColors: r=!1, transparent: a=!1} = e;
                n && (n.minFilter = s.TyD,
                n.magFilter = s.TyD),
                super({
                    uniforms: s.rDY.merge([{
                        map: {
                            value: t
                        },
                        gradientMap: {
                            value: n
                        },
                        aoMap: {
                            value: i
                        }
                    }, s.rBU.common, s.rBU.fog, s.rBU.lights]),
                    vertexShader: "\n        #define TOON\n        varying vec3 vViewPosition;\n        #ifdef USE_TRANSPARENCY\n          varying float vTransparent;\n        #endif\n        #ifdef USE_MAP\n          varying vec2 vUv;\n        #endif\n        #include <common>\n        #include <uv_pars_vertex>\n        #include <uv2_pars_vertex>\n        #include <displacementmap_pars_vertex>\n        #include <color_pars_vertex>\n        #include <fog_pars_vertex>\n        #include <normal_pars_vertex>\n        #include <morphtarget_pars_vertex>\n        #include <skinning_pars_vertex>\n        #include <shadowmap_pars_vertex>\n        #include <logdepthbuf_pars_vertex>\n        #include <clipping_planes_pars_vertex>\n\n        vec3 LinearTosRGB( in vec3 value ) {\n          return mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) );\n        }\n  \n        void main() {\n          #include <uv_vertex>\n          #include <uv2_vertex>\n          #ifdef USE_COLOR\n            vColor = LinearTosRGB(color);\n          #else\n          #endif\n          #ifdef USE_TRANSPARENCY\n            vTransparent = step(0.5, uv.x);\n          #endif\n          #ifdef USE_MAP\n            vUv = uv;\n          #endif\n          #include <morphcolor_vertex>\n          #include <beginnormal_vertex>\n          #include <morphnormal_vertex>\n          #include <skinbase_vertex>\n          #include <skinnormal_vertex>\n          #include <defaultnormal_vertex>\n          #include <normal_vertex>\n          #include <begin_vertex>\n          #include <morphtarget_vertex>\n          #include <skinning_vertex>\n          #include <displacementmap_vertex>\n          #include <project_vertex>\n          #include <logdepthbuf_vertex>\n          #include <clipping_planes_vertex>\n          vViewPosition = - mvPosition.xyz;\n          #include <worldpos_vertex>\n          #include <shadowmap_vertex>\n          #include <fog_vertex>\n        }\n      ",
                    fragmentShader: "\n        #define TOON\n        uniform vec3 diffuse;\n        uniform vec3 emissive;\n        uniform float opacity;\n        #ifdef USE_TRANSPARENCY\n          varying float vTransparent;\n        #endif\n        #ifdef USE_MAP\n          varying vec2 vUv;\n        #endif\n        #include <common>\n        #include <packing>\n        #include <dithering_pars_fragment>\n        #include <color_pars_fragment>\n        #include <uv_pars_fragment>\n        #include <uv2_pars_fragment>\n        #include <map_pars_fragment>\n        #include <alphamap_pars_fragment>\n        #include <alphatest_pars_fragment>\n        #include <aomap_pars_fragment>\n        #include <lightmap_pars_fragment>\n        #include <emissivemap_pars_fragment>\n        #include <gradientmap_pars_fragment>\n        #include <fog_pars_fragment>\n        #include <bsdfs>\n        #include <lights_pars_begin>\n        #include <normal_pars_fragment>\n        #include <lights_toon_pars_fragment>\n        #include <shadowmap_pars_fragment>\n        #include <bumpmap_pars_fragment>\n        #include <normalmap_pars_fragment>\n        #include <logdepthbuf_pars_fragment>\n        #include <clipping_planes_pars_fragment>\n        void main() {\n          #include <clipping_planes_fragment>\n          vec4 diffuseColor = vec4( diffuse, opacity );\n          ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n          vec3 totalEmissiveRadiance = emissive;\n          #ifdef USE_MAP\n            diffuseColor.rgb = texture2D(map, vUv).rgb;\n          #endif\n          #include <logdepthbuf_fragment>\n          #include <map_fragment>\n          #include <color_fragment>\n          #include <alphamap_fragment>\n          #include <alphatest_fragment>\n          #include <normal_fragment_begin>\n          #include <normal_fragment_maps>\n          #include <emissivemap_fragment>\n          #include <lights_toon_fragment>\n          #include <lights_fragment_begin>\n          #include <lights_fragment_maps>\n          #include <lights_fragment_end>\n          #include <aomap_fragment>\n          vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n          #include <output_fragment>\n          #include <tonemapping_fragment>\n          #include <encodings_fragment>\n          #include <fog_fragment>\n          #include <premultiplied_alpha_fragment>\n          #include <dithering_fragment>\n\n          #ifdef USE_TRANSPARENCY\n            float opacity = mix(1.0, 0.5, vTransparent);\n          #else\n            float opacity = 1.0;\n          #endif\n\n          gl_FragColor.a = opacity;\n        }\n      "
                }),
                a && (this.transparent = !0,
                this.defines.USE_TRANSPARENCY = 1),
                t && (this.defines.USE_MAP = 1,
                this.uniforms.map.value = t),
                this.lights = !0,
                this.fog = !0,
                this.vertexColors = r,
                n && (this.defines.USE_GRADIENTMAP = !0),
                o && this.uniforms.diffuse.value.setHex(o)
            }
        }
        class a extends s.xeV {
            offsetInClipSpace(e) {
                let t = "gl_Position = projectionMatrix * mvPosition;"
                  , i = t;
                i += "\n      gl_Position.z += 0.1 / gl_Position.w;\n    ",
                e.vertexShader = e.vertexShader.replace(t, i)
            }
            constructor(e) {
                super(e),
                this.onBeforeCompile = e=>{
                    this.offsetInClipSpace(e)
                }
                ,
                this.fog = !1
            }
        }
        var l = i(18297);
        let h = new Map;
        function c(e, t) {
            let i = h.get(e);
            if (!i) {
                switch (e) {
                case "toon":
                    i = new r({
                        gradientMap: (0,
                        n.Hp)("threeTone", t),
                        vertexColors: !0
                    });
                    break;
                case "collectible":
                    i = new r({
                        gradientMap: (0,
                        n.Hp)("threeTone", t),
                        vertexColors: !0,
                        transparent: !0
                    });
                    break;
                case "segment1":
                case "segment2":
                case "segment3":
                case "segment4":
                case "segment5":
                case "segment6":
                case "segment7":
                    i = new o({
                        aoMap: (0,
                        n.Hp)("".concat(e, "_ao"), t),
                        maskMap: (0,
                        n.Hp)("".concat(e, "_mask"), t),
                        resources: t,
                        vertexColors: !0
                    });
                    break;
                case "sparkle_common":
                case "sparkle_uncommon":
                case "sparkle_rare":
                case "sparkle_epic":
                case "sparkle_legendary":
                    var c;
                    i = new a({
                        transparent: !0,
                        depthWrite: !1,
                        map: (0,
                        n.Hp)("flare", t),
                        color: null === (c = l.u9.get(e.split("_")[1])) || void 0 === c ? void 0 : c.color,
                        opacity: 0.5
                    });
                    break;
                case "sparkle_inner":
                    i = new a({
                        transparent: !0,
                        depthWrite: !1,
                        map: (0,
                        n.Hp)("flare", t),
                        color: 16777215,
                        opacity: .35,
                        blending: s.WMw
                    });
                    break;
                default:
                    i = new s.vBJ
                }
                h.set(e, i)
            }
            return i
        }
        function d() {
            h.clear()
        }
    },
    26954: function(e, t, i) {
        i.d(t, {
            C: function() {
                return n
            }
        });
        var s = i(96995);
        function n(e, t) {
            let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : new s.Pa4
              , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : Math.random
              , o = e * Math.sqrt(n())
              , r = 2 * n() * Math.PI;
            return i.set(o * Math.cos(r), o * Math.sin(r), t * n()),
            i
        }
    },
    2064: function(e, t, i) {
        i.d(t, {
            Bo: function() {
                return o
            },
            Hp: function() {
                return r
            },
            Xh: function() {
                return a
            },
            dg: function() {
                return p
            },
            ge: function() {
                return h
            },
            r6: function() {
                return c
            },
            ue: function() {
                return l
            },
            yp: function() {
                return d
            }
        });
        var s = i(96995)
          , n = i(19295);
        function o(e, t) {
            let i = n.B[e]
              , s = t.get(i)
              , o = null == s ? void 0 : s.file;
            return o
        }
        function r(e, t) {
            let i = n.B[e]
              , s = t.get(i)
              , o = null == s ? void 0 : s.file;
            return o
        }
        function a(e, t) {
            var i;
            let s = o(e, t)
              , n = null === (i = m(s)) || void 0 === i ? void 0 : i.clone();
            return n
        }
        function l(e, t) {
            return u("segments", e, t)
        }
        function h(e, t) {
            return u("floatingObstacles", e, t)
        }
        function c(e, t) {
            return u("staticObstacles", e, t)
        }
        function d(e, t) {
            return u("trashObjects", e, t)
        }
        function p(e, t) {
            let i = o("collectibles", t)
              , s = null == i ? void 0 : i.scene.children[0].children[e];
            return s
        }
        function u(e, t, i) {
            var s;
            let n = o(e, i)
              , r = null === (s = m(n, t)) || void 0 === s ? void 0 : s.clone();
            return r
        }
        function m(e, t) {
            let i = null;
            return null == e || e.scene.traverse(e=>{
                e instanceof s.Kj0 && (!t || t === e.name) && (i = e)
            }
            ),
            i
        }
    },
    27172: function(e) {
        e.exports = JSON.parse('["barrel","bin","car","christmastree","cone","cow","desk","firehydrant","freezer","lid","locker","metalsheet","neon","phonebooth","radiator","safe","speaker","trafficsign","trafficsign2","trafficsign3","trafficsign4","trafficsign5","trash","tv","wc","wheel","wheelbarrow","wheelchair","window"]')
    }
}]);
